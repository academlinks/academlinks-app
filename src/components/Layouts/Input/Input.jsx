import { useState } from "react";

import { EyeHideIcon, EyeShowIcon } from "components/Layouts/Icons";
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
  const [showPassword, setShowPassword] = useState(false);
  const [inpType, setInpType] = useState(type);

  const [focus, setFocus] = useState(false);

  return (
    <div className={`${styles.inputField} ${className || ""}`}>
      {label && (
        <label htmlFor={id} className={styles.inpLabel} title={labelTitle}>
          {label}
          {anotation && (
            <span
              className={`${styles.anotation} ${focus ? styles.active : ""}`}
            >
              {anotation}
            </span>
          )}
        </label>
      )}

      <div
        className={`${styles.inpField} ${error ? styles.error : ""}`}
        data-inp-box
      >
        <input
          type={inpType}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          className={styles.inp}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          // value={defaultValue ? defaultValue : value}
          // value={value}
          // defaultValue={defaultValue || ""}
          {...(defaultValue ? { defaultValue } : { value })}
        />

        {type === "password" && (
          <span
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
              setInpType((prev) => (prev === "password" ? "text" : "password"));
            }}
            className={styles.iconBox}
          >
            {!showPassword && <EyeShowIcon />}
            {showPassword && <EyeHideIcon />}
          </span>
        )}
      </div>

      {/* {anotition && <p className={styles.anotition}>{anotition}</p>} */}
      {error && <p className={styles.inpErrMsg}>{message}</p>}
    </div>
  );
}

export default Input;
