/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useMemo, useCallback, useEffect } from "react";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import createMentionsPlugin from "@draft-js-plugins/mention";
import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import { axiosQuery } from "../../../store/axiosConfig";

function DraftEditor({ placeholder, text, setText, className }) {
  // create and destructure plugins
  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionsPlugin();
    const linkifyPlugin = createLinkifyPlugin({
      target: "_blank",
    });

    const { MentionSuggestions } = mentionPlugin;

    const plugins = [mentionPlugin, linkifyPlugin];

    return { plugins, MentionSuggestions };
  }, []);

  const ref = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [defaultTextIsSet, setDefaultTextIsSet] = useState(false);

  // handle editor change
  function handleChange(es) {
    const convertedEditor = convertToRaw(editorState.getCurrentContent());
    if (!text || (text && defaultTextIsSet)) setText(convertedEditor);
    setEditorState(es);
  }

  // open suggestion popup
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);

  // handle mention suggestions
  const [suggestions, setSuggestions] = useState([]);
  const onSearchChange = useCallback(async ({ value }) => {
    const { data } = await axiosQuery(`/user/search?key=${value}`);

    function fitResultToDraft() {
      return data.map((user) => ({
        name: user.userName,
        avatar: user.profileImg,
        link: `/profile/${user._id}/posts`,
        _id: user._id,
      }));
    }

    setSuggestions(customSuggestionsFilter(value, fitResultToDraft()));
  }, []);

  // clean up editor

  useEffect(() => {
    if (text && !defaultTextIsSet) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(text || "")))
      );
      setDefaultTextIsSet(true);
    } else if (!text && defaultTextIsSet) {
      setEditorState(EditorState.createEmpty());
      setDefaultTextIsSet(false);
    }
  }, [text]);

  useEffect(() => {
    return () => {
      setDefaultTextIsSet(false);
    };
  }, []);

  return (
    <div onClick={() => ref.current.focus()} className={className || ""}>
      <Editor
        editorKey="editor"
        editorState={editorState}
        onChange={handleChange}
        plugins={plugins}
        ref={ref}
        placeholder={placeholder}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
      />
    </div>
  );
}

export default DraftEditor;

function customSuggestionsFilter(searchValue, suggestions, limit = 10) {
  // const size = (list) =>
  //   list.constructor.name === "List" ? list.size : list.length;

  const get = (obj, attr) => (obj.get ? obj.get(attr) : obj[attr]);

  const value = searchValue.toLowerCase();
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      !value || get(suggestion, "name").toLowerCase().indexOf(value) > -1
  );

  // const length =
  //   size(filteredSuggestions) < limit ? size(filteredSuggestions) : limit;

  // return filteredSuggestions.slice(0, length);
  return filteredSuggestions;
}
