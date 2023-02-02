/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableBirthDate } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import UpdateButtons from "./UpdateButtons";
import { DateForm, Error, BlockSpinner } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

function ChangeBirthDateForm() {
  const {
    birthDate,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableBirthDate);
  const [selectedDate, setSelectedDate] = useState(new Date(birthDate));

  const { handleResetBirthdate, handleCancel } = useSettings();
  const { addBirthDateQuery, birthDateError } = useSettingsQuery();

  function dateHandler(dateVal) {
    setSelectedDate(dateVal);
  }

  function handleUpdate() {
    const [year, month, day] = selectedDate
      .toISOString()
      .slice(0, 10)
      .split("-");

    function padTo2Digits(str) {
      return str.padStart(2, "0");
    }

    const isoDateStr = `${padTo2Digits(month)}-${padTo2Digits(day)}-${year}`;

    addBirthDateQuery({ data: isoDateStr });
  }

  useEffect(() => {
    return () => handleResetBirthdate();
  }, []);

  return (
    <form className={styles.formsContainer}>
      <div className={styles.form}>
        <DateForm handler={dateHandler} date={birthDate} />
      </div>

      {birthDateError.error && (
        <p data-user-info-error-box>{birthDateError.message}</p>
      )}

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetBirthdate)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeBirthDateForm;
