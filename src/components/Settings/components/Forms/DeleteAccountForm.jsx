import { useSelector } from "react-redux";

import { useSettingsQuery } from "hooks/queries";
import { selectActiveUserLoadingState } from "store/selectors/activeUserSelectors";

import { Input, BTN, Error, DeletionPopUp } from "components/Layouts";
import styles from "../styles/detailed.module.scss";

function DeleteAccountForm() {
  const { loading, error, message } = useSelector(selectActiveUserLoadingState);

  const { deleteAccountQuery } = useSettingsQuery();

  return (
    <form className={styles.formsContainer} onSubmit={deleteAccountQuery}>
      <div className={`${styles.form} ${styles.passForm}`}>
        <Input
          placeholder="password"
          type="password"
          name="password"
          className={styles.inpField}
          id="password"
        />
      </div>
      {loading && (
        <DeletionPopUp
          showButtons={false}
          showSpinner={loading}
          message={"this will may take couple of minutes"}
        />
      )}
      {error && <Error msg={message} />}

      <BTN type="submit" btnType="delete" className={styles.singleBtn}>
        delete account
      </BTN>
    </form>
  );
}

export default DeleteAccountForm;
