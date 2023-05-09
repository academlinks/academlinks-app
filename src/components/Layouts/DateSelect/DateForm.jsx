import { useState } from "react";
import styles from "./dateForm.module.scss";

function DateForm({
  handler = () => {},
  date,
  label,
  id,
  error,
  message,
  name,
  defaultValue,
}) {
  const [currDate, setCurrDate] = useState(date || undefined);
  const [focus, setFocus] = useState(false);

  return (
    <div className={`${styles.dateField} `} data-date-box>
      {label && (
        <label htmlFor={id} className={styles.inputLabel}>
          {label}
        </label>
      )}

      <div
        className={`${styles.inputField} ${focus ? styles.focused : ""} ${
          error ? styles.error : ""
        }`}
      >
        <input
          name={name || ""}
          type="date"
          id={label ? id : ""}
          className={styles.input}
          value={currDate ? createDateStr(new Date(currDate)) : ""}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => {
            setCurrDate(e.target.value);
            handler(new Date(e.target.value));
          }}
        />
      </div>

      {error && <p className={styles.errorMessage}>{message}</p>}
    </div>
  );
}

export default DateForm;

function createDateStr(date) {
  if (!date) return;
  return date.toISOString().slice(0, 10);
}
