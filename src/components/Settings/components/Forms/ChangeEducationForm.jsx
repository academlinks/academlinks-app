/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { VALID_DEGREES } from "lib/config";
import { useSettings } from "hooks/layoutBased";
import { useSettingsQuery } from "hooks/queries";
import { selectUpdateableEducation } from "store/selectors/settingsSelector";

import {
  Input,
  TextField,
  DateForm,
  Error,
  BlockSpinner,
  Select,
} from "components/Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeEducationForm() {
  const {
    state: { operation, docId },
  } = useLocation();

  const {
    education,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableEducation);

  const { handleResetEducation, handleCancel } = useSettings();
  const { addEducationQuery, educationError, setEducationError } =
    useSettingsQuery();

  useEffect(() => {
    return () => handleResetEducation();
  }, []);

  return (
    <form
      className={styles.formsContainer}
      onSubmit={(e) => {
        e.preventDefault();
        addEducationQuery({ operation, docId, formData: e.currentTarget });
      }}
    >
      <div className={`${styles.form} ${styles.educationForm}`}>
        <Input
          type="text"
          name="collage"
          label="collage"
          placeholder="collage"
          defaultValue={education.collage}
          error={educationError.collage.hasError}
          message={educationError.collage.message}
          onChange={() =>
            educationError.collage.hasError &&
            setEducationError((prev) => ({
              ...prev,
              collage: {
                hasError: false,
                message: "",
              },
            }))
          }
          className={styles.inpField}
          id="collage"
        />

        <Input
          type="text"
          name="faculty"
          label="faculty"
          placeholder="faculty"
          defaultValue={education.faculty}
          error={educationError.faculty.hasError}
          message={educationError.faculty.message}
          onChange={() =>
            educationError.faculty.hasError &&
            setEducationError((prev) => ({
              ...prev,
              faculty: {
                hasError: false,
                message: "",
              },
            }))
          }
          className={styles.inpField}
          id="faculty"
        />

        <Select
          name="degree"
          label="degree"
          error={educationError.degree.hasError}
          message={educationError.degree.message}
          handler={() =>
            educationError.degree.hasError &&
            setEducationError((prev) => ({
              ...prev,
              degree: {
                hasError: false,
                message: "",
              },
            }))
          }
          data={{
            default: {
              label: education.degree || "degree",
              value: education.degree || "degree",
            },
            name: "degree",
            values: VALID_DEGREES,
          }}
        />

        <div className={styles.dateBox}>
          <DateForm
            date={education.years?.from}
            label="date from"
            id="dateFrom"
            name="dateFrom"
          />
          
          <DateForm
            date={education.years?.to}
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
            defaultValue={education.description}
            name="description"
            label="description"
            id="description"
          />
        </div>
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetEducation)}
        updaterType="submit"
      />
    </form>
  );
}

export default ChangeEducationForm;
