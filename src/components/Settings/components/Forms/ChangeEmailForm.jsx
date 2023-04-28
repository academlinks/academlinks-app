import { useSelector } from "react-redux";

import { useSettingsQuery } from "hooks/queries";
import { selectUpdateableStatus } from "store/selectors/settingsSelector";

import { Input, BTN, BlockSpinner, Error } from "components/Layouts";
import styles from "../styles/detailed.module.scss";

function ChangeEmailForm() {
  const { loading, error, message } = useSelector(selectUpdateableStatus);

  const { updateEmailQuery, emailError, setEmailError } = useSettingsQuery();

  return (
    <form className={styles.formsContainer} onSubmit={updateEmailQuery}>
      <div className={`${styles.form} ${styles.passForm}`}>
        <Input
          placeholder="email"
          type="email"
          name="currEmail"
          className={styles.inpField}
          id="email"
          error={emailError.email.hasError}
          message={emailError.email.message}
          onChange={() =>
            emailError.email.hasError &&
            setEmailError((prev) => ({
              ...prev,
              email: {
                hasError: false,
                message: "",
              },
            }))
          }
        />

        <Input
          placeholder="password"
          type="password"
          name="password"
          className={styles.inpField}
          id="password"
          error={emailError.password.hasError}
          message={emailError.password.message}
          onChange={() =>
            emailError.password.hasError &&
            setEmailError((prev) => ({
              ...prev,
              password: {
                hasError: false,
                message: "",
              },
            }))
          }
        />

        <Input
          placeholder="new email"
          type="email"
          name="newEmail"
          className={styles.inpField}
          id="newEmail"
          error={emailError.newEmail.hasError}
          message={emailError.newEmail.message}
          onChange={() =>
            emailError.newEmail.hasError &&
            setEmailError((prev) => ({
              ...prev,
              newEmail: {
                hasError: false,
                message: "",
              },
            }))
          }
        />
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <BTN type="submit" className={styles.singleBtn}>
        update email
      </BTN>
    </form>
  );
}

export default ChangeEmailForm;
