import { useState } from "react";

import InputLabel from "./InputLabel";
import PasswordToggleButton from "./PasswordToggleButton";
import styles from "./input.module.scss";

function Input({
  onChange = () => {},
  value,
  defaultValue,
  type = "text",
  id,
  label,
  labelTitle,
  className,
  name,
  placeholder = "text",
  error = false,
  message = "",
  anotation,
}) {
  const [inputType, setInputType] = useState(type);

  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`${styles.inputContainer} ${className || ""}`}
      data-form-input
    >
      {label && (
        <InputLabel
          id={id}
          label={label}
          labelTitle={labelTitle}
          anotation={anotation}
          focus={focus}
        />
      )}

      <div
        className={`${styles.inputField} ${focus ? styles.focused : ""} ${
          error ? styles.error : ""
        }`}
        data-inp-box
      >
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          className={styles.input}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...(defaultValue ? { defaultValue } : { value })}
        />

        {type === "password" && (
          <PasswordToggleButton setInputType={setInputType} />
        )}
      </div>

      {error && <p className={styles.errorMessage}>{message}</p>}
    </div>
  );
}

export default Input;
