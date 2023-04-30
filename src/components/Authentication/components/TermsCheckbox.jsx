import TermsAndPolicyLink from "./TermsAndPolicyLink";
import styles from "./styles/termsCheckbox.module.scss";

function TermsCheckbox({ error, message, onChange }) {
  return (
    <div className={styles.termsCheckbox}>
      <div className={styles.termsCheckboxField}>
        <input type="checkbox" id="terms" name="terms" onChange={onChange} />
        <label htmlFor="terms">
          I accept the
          <TermsAndPolicyLink />
        </label>
      </div>
      {error && <p className={styles.errorMessage}>{message}</p>}
    </div>
  );
}

export default TermsCheckbox;
