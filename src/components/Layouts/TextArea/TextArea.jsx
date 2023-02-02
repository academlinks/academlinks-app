import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./components/styles/textArea.module.scss";
import { SendIcon } from "../Icons/icons";

function TextArea({
  handler = (text) => {},
  className,
  placeholder,
  focus,
  onFocus = () => {},
  defaultValue,
  withBtn = true,
}) {
  const [text, setText] = useState("");

  function textAreaSubmit(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handler(text);
      setText("");
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    handler(text);
    setText("");
  }

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  return (
    <form
      className={styles.textAreaForm}
      onSubmit={submitHandler}
      data-text-area-form-box
    >
      <div className={styles.fields}>
        <TextareaAutosize
          id="test"
          minRows={1}
          maxRows={5}
          placeholder={placeholder}
          onFocus={onFocus}
          value={text}
          autoFocus={focus}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={textAreaSubmit}
          className={`${styles.textArea} ${className}`}
        />
        {withBtn && (
          <button className={styles.textAreaBtn} type="submit">
            <SendIcon />
          </button>
        )}
      </div>
    </form>
  );
}

export default TextArea;
