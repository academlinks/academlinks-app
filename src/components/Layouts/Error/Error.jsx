import { useEffect } from "react";

import { useRestrictBodyOverflow } from "hooks/util";

import { ErrorIcon } from "components/Layouts/Icons";
import styles from "./error.module.scss";

function Error({ msg, asModal = false, onClose = () => {}, className }) {
  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    restrictScroll(asModal);
    return () => restrictScroll(false);
  }, [restrictScroll, asModal]);

  return (
    <div
      className={`${styles.error} ${asModal ? styles.asModal : ""} ${
        className || ""
      }`}
      onClick={() => {
        if (!asModal) return;
        onClose();
      }}
      data-error-box
    >
      <div className={styles.innerContainer}>
        <ErrorIcon />
        {msg}
        {asModal && (
          <button onClick={() => onClose()} className={styles.closeBtn}>
            ok
          </button>
        )}
      </div>
    </div>
  );
}

export default Error;
