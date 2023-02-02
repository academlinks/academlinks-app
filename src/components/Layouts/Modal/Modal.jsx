import { useRestrictBodyOverflow } from "../../../hooks";

import Modal from "react-modal";
import styles from "./modal.module.scss";
import { CloseIcon } from "../Icons/icons";

Modal.setAppElement("#root");

function Modall({ children, className, modalClassName, isOpen, setIsOpen }) {
  const { restrictScroll } = useRestrictBodyOverflow(isOpen, true);

  function closeModal() {
    restrictScroll(false);
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={`${styles.modal} ${modalClassName || ""}`}
      overlayClassName={styles.modalOverlay}
    >
      <div className={`${styles.modalContent} ${className || ""}`}>
        {children}
        <button
          className={styles.modalCloseBtn}
          onClick={closeModal}
          data-modal-close-btn
        >
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
}

export default Modall;
