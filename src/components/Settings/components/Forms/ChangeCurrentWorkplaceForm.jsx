import { useSelector } from "react-redux";

import { selectUpdateableCurrentWorkplace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";
import { USER_WORKPLACE_POSITIONS } from "../../../../lib/config";

import {
  Input,
  Select,
  TextField,
  BlockSpinner,
  Error,
} from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeCurrentWorkplaceForm() {
  const {
    updateState: { loading, error, message },
    currentWorkplace,
  } = useSelector(selectUpdateableCurrentWorkplace);

  const { handleResetCurrentWorkplace, handleCancel } = useSettings();

  const {
    updateCurrentWorkplaceQuery,
    currentWorkPlaceError,
    setCurrentWorkPlaceError,
  } = useSettingsQuery();

  return (
    <form
      className={styles.formsContainer}
      onSubmit={updateCurrentWorkplaceQuery}
    >
      <div className={`${styles.form} ${styles.workplaceForm}`}>
        <Input
          type="text"
          name="institution"
          label="institution"
          placeholder="institution"
          defaultValue={currentWorkplace.institution}
          error={currentWorkPlaceError.institution.hasError}
          message={currentWorkPlaceError.institution.message}
          onChange={() =>
            currentWorkPlaceError.institution.hasError &&
            setCurrentWorkPlaceError((prev) => ({
              ...prev,
              institution: {
                hasError: false,
                message: "",
              },
            }))
          }
          className={styles.inpField}
          id="company"
        />

        <Select
          label="position"
          name="position"
          error={currentWorkplace.position.hasError}
          message={currentWorkPlaceError.position.message}
          handler={() =>
            currentWorkPlaceError.position.hasError &&
            setCurrentWorkPlaceError((prev) => ({
              ...prev,
              position: {
                hasError: false,
                message: "",
              },
            }))
          }
          data={{
            default: {
              label: currentWorkplace.position || "position",
              value: currentWorkplace.position || "position",
            },
            values: USER_WORKPLACE_POSITIONS,
          }}
        />

        <div className={styles.description}>
          <TextField
            minRows={4}
            maxRows={8}
            className={styles.textFieldDesc}
            placeholder="description"
            defaultValue={currentWorkplace.description}
            error={currentWorkPlaceError.description.hasError}
            message={currentWorkPlaceError.description.message}
            onChange={() =>
              currentWorkPlaceError.description.hasError &&
              setCurrentWorkPlaceError((prev) => ({
                ...prev,
                description: {
                  hasError: false,
                  message: "",
                },
              }))
            }
            name="description"
            label="description"
            id="description"
          />
        </div>
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetCurrentWorkplace)}
        updaterType="submit"
      />
    </form>
  );
}

export default ChangeCurrentWorkplaceForm;
