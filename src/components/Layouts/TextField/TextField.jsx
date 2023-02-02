import styles from "./textField.module.scss";
import TextareaAutosize from "react-textarea-autosize";

function TextField({
  minRows = 2,
  maxRows = 5,
  value,
  defaultValue = "",
  placeholder = "text",
  onChange = () => {},
  className,
  name,
  focus = false,
  label,
  error,
  message,
  id,
}) {
  return (
    <div
      className={`${styles.textFieldContainer} ${error ? styles.error : ""}`}
      data-txt-field-container
    >
      {label && (
        <label htmlFor={id} className={styles.txtFieldLabel}>
          {label}
        </label>
      )}
      <TextareaAutosize
        rows={minRows}
        maxRows={maxRows}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoFocus={focus}
        className={`${styles.textArea} ${className ? className : ""}`}
        value={value}
        defaultValue={defaultValue || ""}
        id={id}
      />
      {error && <p className={styles.txtFieldError}>{message}</p>}
    </div>
  );
}

export default TextField;
