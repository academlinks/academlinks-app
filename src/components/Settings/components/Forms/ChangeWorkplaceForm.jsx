/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectUpdateableWorkplace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import {
  Input,
  TextField,
  DateForm,
  Error,
  BlockSpinner,
} from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeWorkplaceForm() {
  const {
    state: { operation, docId },
  } = useLocation();

  const {
    workplace,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableWorkplace);

  const { handleResetWorkplace, handleCancel } = useSettings();
  const { addWorkplaceQuery, workplaceError, setWorkplaceError } =
    useSettingsQuery();

  useEffect(() => {
    return () => handleResetWorkplace();
  }, []);

  return (
    <form
      className={styles.formsContainer}
      onSubmit={(e) => {
        e.preventDefault();
        addWorkplaceQuery({ operation, docId, formData: e.currentTarget });
      }}
    >
      <div className={`${styles.form} ${styles.workplaceForm}`}>
        <Input
          type="text"
          name="institution"
          label="institution"
          placeholder="institutioninstitution"
          defaultValue={workplace.institution}
          error={workplaceError.institution.hasError}
          message={workplaceError.institution.message}
          onChange={() =>
            workplaceError.company.hasError &&
            setWorkplaceError((prev) => ({
              ...prev,
              institution: {
                hasError: false,
                message: "",
              },
            }))
          }
          className={styles.inpField}
          id="institution"
        />

        <Input
          type="text"
          name="position"
          label="position"
          placeholder="position"
          defaultValue={workplace.position}
          error={workplaceError.position.hasError}
          message={workplaceError.position.message}
          onChange={() =>
            workplaceError.position.hasError &&
            setWorkplaceError((prev) => ({
              ...prev,
              position: {
                hasError: false,
                message: "",
              },
            }))
          }
          className={styles.inpField}
          id="position"
        />

        <div className={styles.dateBox}>
          <DateForm
            date={workplace.workingYears?.from}
            label="date from"
            id="dateFrom"
            name="dateFrom"
          />
          <DateForm
            date={workplace.workingYears?.to}
            label="date to"
            id="dateTo"
            name="dateTo"
          />
        </div>

        <div className={styles.description}>
          <TextField
            minRows={4}
            maxRows={8}
            className={styles.textFieldDesc}
            placeholder="description"
            defaultValue={workplace.description}
            name="description"
            label="description"
            id="description"
          />
        </div>
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetWorkplace)}
        updaterType="submit"
      />
    </form>
  );
}

export default ChangeWorkplaceForm;
