import { useNavigate } from "react-router-dom";

import styles from "./unknowPage.module.scss";
import { ArrowLeftRectingle } from "../../components/Layouts/Icons/icons";

function UnknownPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.unknownPage}>
      <p className={styles.message}>
        <span className={styles.status}>404</span> | Unknown Page
      </p>
      <button
        className={styles.goBackBtn}
        onClick={() => navigate(-1, { replace: true })}
      >
        <ArrowLeftRectingle />
        <span>go back</span>
      </button>
    </div>
  );
}

export default UnknownPage;
