import { Link } from "react-router-dom";
import styles from "./styles/termsAndPolicyLink.module.scss";

function TermsAndPolicyLink() {
  return (
    <Link
      to="/terms-and-policy/terms"
      className={styles.termsAndPolicyLink}
      data-policy-link
    >
      Terms&Policy
    </Link>
  );
}

export default TermsAndPolicyLink;
