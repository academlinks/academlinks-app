/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  searchUser,
  resetSearchResult,
} from "../../../store/reducers/userReducer";
import { selectUserSearchResult } from "../../../store/selectors/userSelectors";

import TextareaAutosize from "react-textarea-autosize";
import styles from "./components/styles/textArea.module.scss";
import TagsList from "./components/TagsList";
import TagsWindow from "./components/TagsWindow";
// import { SendIcon } from "../Icons/icons";

function TextAreaWithTag({
  submitHandler = (text) => {},
  text,
  setText,
  tags,
  setTag,
  removeTag,
  className,
  placeholder,
  focus,
  maxRows,
}) {
  const dispatch = useDispatch();

  function textAreaSubmit(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
      setText("");
    }
  }

  const [currTag, setCurrTag] = useState(false);
  const result = useSelector(selectUserSearchResult);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text?.includes("@")) {
        const candidate = text.split("@")[1];
        if (candidate) {
          setCurrTag(true);
          dispatch(searchUser(candidate));
        }
      } else if (!text?.includes("@") && currTag) {
        setCurrTag(false);
        dispatch(resetSearchResult());
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text]);

  function handleCandidate(user) {
    setTag({ _id: user._id, userName: user.userName });
    const tx = text.split("@");
    setText(tx[0]);
    setCurrTag(false);
    dispatch(resetSearchResult());
  }

  function deleteTagCandidate(id) {
    removeTag(id);
  }

  return (
    <form
      className={styles.textAreaForm}
      onSubmit={submitHandler}
      data-text-area-with-tag
    >
      {tags[0] && (
        <TagsList tags={tags} deleteTagCandidate={deleteTagCandidate} />
      )}
      <div className={styles.fields}>
        <TextareaAutosize
          id="text-area-with-tag"
          minRows={1}
          maxRows={maxRows || 5}
          placeholder={placeholder}
          value={text}
          autoFocus={focus}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={textAreaSubmit}
          className={`${styles.textArea} ${className || ""}`}
        />
        {/* <button className={styles.textAreaBtn} type='submit'>
          <SendIcon />
        </button> */}
      </div>
      {currTag && (
        <TagsWindow result={result} handleCandidate={handleCandidate} />
      )}
    </form>
  );
}

export default TextAreaWithTag;
