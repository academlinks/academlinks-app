import { ArrowLeftRectingle } from "components/Layouts/Icons";
import styles from "./goBackBTN.module.scss";

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
