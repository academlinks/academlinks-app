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

  return (
    <div className={styles.dateField} data-date-box>
      {label && (
        <label htmlFor={id} className={styles.inpLabel}>
          {label}
        </label>
      )}

      <input
        name={name || ""}
        type="date"
        id={label ? id : ""}
        className={`${styles.inpField} ${styles.inp} ${
          error ? styles.error : ""
        }`}
        value={currDate ? createDateStr(new Date(currDate)) : ""}
        // defaultValue={defaultValue ? createDateStr(new Date(defaultValue)) : ""}
        onChange={(e) => {
          setCurrDate(e.target.value);
          handler(new Date(e.target.value));
        }}
      />

      {error && <p className={styles.inpErrMsg}>{message}</p>}
    </div>
  );
}

export default DateForm;

function createDateStr(date) {
  if (!date) return;
  return date.toISOString().slice(0, 10);
}
