/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { flattenDeep } from "lodash";

import { EditorState, convertFromRaw, CompositeDecorator } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createMentionsPlugin from "@draft-js-plugins/mention";

import styles from "./styles/draftReader.module.scss";

function DraftReader({ text, limit, showMoreHandler, asLink = false, path }) {
  const { plugins, decorator } = useMemo(() => {
    const mentionPlugin = createMentionsPlugin();
    const linkifyPlugin = createLinkifyPlugin({
      target: "_blank",
    });

    const plugins = [mentionPlugin, linkifyPlugin];

    const decorators = flattenDeep(plugins.map((pl) => pl.decorators));
    const decorator = new CompositeDecorator(
      decorators.filter((_, i) => i !== 1)
    );

    return { plugins, decorator };
  }, []);

  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [showMore, setShowMore] = useState(limit ? true : false);
  const [overlapsLimit, setOverlapsLimit] = useState(false);

  function createEditorState(stringifiedData, showMore = false) {
    if (!stringifiedData) return;

    const reservedContentState = JSON.parse(stringifiedData || "");
    const exceedsLimit =
      getWordCountsFromBlocks(reservedContentState.blocks) > limit;

    setOverlapsLimit(exceedsLimit);

    if (!limit || showMore || !exceedsLimit) {
      return EditorState.createWithContent(
        convertFromRaw(reservedContentState),
        decorator
      );
    } else {
      return EditorState.createWithContent(
        convertFromRaw(createLimitedEditorState(reservedContentState, limit)),
        decorator
      );
    }
  }

  function handleShowMore() {
    setEditorState(createEditorState(text, true));
    setShowMore(false);

    showMoreHandler && showMoreHandler();
  }

  useEffect(() => {
    if (!text) return;
    setEditorState(createEditorState(text));
  }, [text, limit]);

  return (
    <>
      <Editor
        editorKey="readonly-editor"
        editorState={editorState}
        onChange={() => {}}
        plugins={plugins}
        ref={editorRef}
        readOnly={true}
      />
      {asLink ? (
        <Link
          to={{
            pathname: path,
            // query: query,
          }}
          target="_blank"
          data-draft-show-more-btn
        >
          show more
        </Link>
      ) : (
        showMore &&
        overlapsLimit && (
          <button
            className={styles.showMoreBtn}
            onClick={handleShowMore}
            data-draft-show-more-btn
          >
            show more
          </button>
        )
      )}
    </>
  );
}

export default DraftReader;

function getWordCountsFromBlocks(blocks) {
  return blocks.reduce(
    (acc, block) => (acc += block.text?.split(" ").length),
    0
  );
}

/** have to get raw state and max word count */
function createLimitedEditorState(convertedState, limit) {
  const blocksToRender = {
    ...convertedState,
    blocks: [],
    // entityMap: convertedState.entityMap,
  };

  const getWordCount = (block) => block.split(" ").length;

  convertedState.blocks.forEach((block) => {
    if (!blocksToRender.blocks[0]) {
      if (getWordCount(block.text) > limit) {
        block.text = block.text.split(" ").slice(0, limit).join(" ");

        blocksToRender.blocks.push(block);
        return;
      } else {
        blocksToRender.blocks.push(block);
      }
    } else {
      const existingWordCount = getWordCountsFromBlocks(blocksToRender.blocks);

      if (existingWordCount > limit) return;

      const freeSpace = limit - existingWordCount;

      if (freeSpace > getWordCount(block.text)) {
        blocksToRender.blocks.push(block);
      } else {
        block.text = block.text.split(" ").slice(0, freeSpace).join(" ");
        blocksToRender.blocks.push(block);

        return;
      }
    }
  });

  return blocksToRender;
}
