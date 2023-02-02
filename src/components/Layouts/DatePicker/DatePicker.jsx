import { useState, useEffect } from "react";

import { formatDate } from "../../../lib";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./datePicker.module.scss";

function DatePicker({
  className,
  date = new Date(),
  name,
  id,
  defaultDate = new Date(),
}) {
  const [value, onChange] = useState(date);

  function handleClickDay() {}

  useEffect(() => {
    onChange(defaultDate);
  }, [defaultDate]);

  return (
    <div className={`${styles.dtPckrBoxRe} ${className}`}>
      <input
        type="text"
        name={name}
        value={value}
        className={styles.dtPckrBoxRePlaceholder}
        onChange={() => {}}
      />
      <input
        type="checkbox"
        id={`${id || "selectedDate"}`}
        className={styles.dtPckrBoxReSelectedDate}
      />
      <label
        htmlFor={id || "selectedDate"}
        className={styles.dtPckrBoxReLabbel}
      >
        {formatDate(value)}
      </label>
      <Calendar
        onChange={onChange}
        value={value}
        className={styles.dtPckrBoxRePicker}
        onClickDay={handleClickDay}
      />
    </div>
  );
}

export default DatePicker;
