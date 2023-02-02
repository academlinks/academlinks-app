import styles from "./goBackBTN.module.scss";
import { ArrowLeftRectingle } from "../Icons/icons";

function GoBackBTN({ handler, className }) {
  return (
    <button
      onClick={handler}
      className={`${styles.goBackBtn} ${className || ""}`}
    >
      <ArrowLeftRectingle />
    </button>
  );
}

export default GoBackBTN;
