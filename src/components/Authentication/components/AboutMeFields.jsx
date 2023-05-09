import { USER_WORKPLACE_POSITIONS } from "lib/config";

import { Input, Select, TextField } from "components/Layouts";
import styles from "./styles/aboutMeFields.module.scss";

function AboutMeFields({ regError, resetFieldError }) {
  return (
    <>
      <p data-registration-form-heading>About Me</p>
      <div className={styles.workplaceFieldsContainer}>
        <Input
          name="institution"
          label="institution"
          type="text"
          placeholder="institution"
          error={regError.institution.hasError}
          message={regError.institution.message}
          onChange={() => {
            regError.institution.hasError && resetFieldError("institution");
          }}
        />

        <Select
          name="position"
          label="position"
          error={regError.position.hasError}
          message={regError.position.message}
          data={{
            default: "position",
            name: "position",
            values: USER_WORKPLACE_POSITIONS,
          }}
          handler={() => {
            regError.position.hasError && resetFieldError("position");
          }}
        />

        <TextField
          name="description"
          minRows={4}
          maxRows={8}
          className={styles.textFieldDesc}
          placeholder="description"
          label="bio"
          error={regError.description.hasError}
          message={regError.description.message}
          onChange={() => {
            regError.description.hasError && resetFieldError("description");
          }}
        />
      </div>
    </>
  );
}

export default AboutMeFields;
