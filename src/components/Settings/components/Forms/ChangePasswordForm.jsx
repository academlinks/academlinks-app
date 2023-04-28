import { useSelector } from "react-redux";

import { useSettingsQuery } from "hooks/queries";
import { selectUpdateableStatus } from "store/selectors/settingsSelector";

import styles from "../styles/detailed.module.scss";
import { Input, BTN, BlockSpinner, Error } from "components/Layouts";

function ChangePasswordForm() {
  const { loading, error, message } = useSelector(selectUpdateableStatus);

  const { updatePasswordQuery, passwordError, setPasswordError } =
    useSettingsQuery();

  return (
    <form onSubmit={updatePasswordQuery} className={styles.formsContainer}>
      <div className={`${styles.form} ${styles.passForm}`}>
        <Input
          placeholder="current password"
          error={passwordError.currentPassword.hasError}
          message={passwordError.currentPassword.message}
          onChange={() =>
            passwordError.currentPassword.hasError &&
            setPasswordError((prev) => ({
              ...prev,
              currentPassword: {
                hasError: false,
                message: "",
              },
            }))
          }
          type="password"
          name="currPassword"
          className={styles.inpField}
          id="password"
        />

        <Input
          placeholder="new password"
          error={passwordError.newPassword.hasError}
          message={passwordError.newPassword.message}
          onChange={() =>
            passwordError.newPassword.hasError &&
            setPasswordError((prev) => ({
              ...prev,
              newPassword: {
                hasError: false,
                message: "",
              },
            }))
          }
          type="password"
          name="newPassword"
          className={styles.inpField}
          id="newPassword"
        />
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <BTN type="submit" className={styles.singleBtn}>
        update password
      </BTN>
    </form>
  );
}

export default ChangePasswordForm;
