import { BTN } from "components/Layouts";
import styles from "./styles/successfullRegistrationPopUp.module.scss";

function SuccessfullRegistrationPopUp({ children, onClick }) {
  return (
    <div className={styles.successModalContainer}>
      <div className={styles.successModal}>
        {children}
        <BTN onClick={onClick}>ok</BTN>
      </div>
    </div>
  );
}

export default SuccessfullRegistrationPopUp;
