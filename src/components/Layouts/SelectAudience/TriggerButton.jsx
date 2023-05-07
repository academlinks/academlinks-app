import { Audience } from "..";
import { ArrowDownRectingle } from "../Icons";
import styles from "./selectAudience.module.scss";

function TriggerButton({ audience, setActivateSelection }) {
  return (
    <button
      className={styles.selectAudienceMainBtn}
      onClick={() => setActivateSelection((prev) => !prev)}
    >
      <Audience audience={audience} />
      <span>{audience === "users" ? "only users" : audience}</span>
      <ArrowDownRectingle className={styles.selectAudienceIndicator} />
    </button>
  );
}

export default TriggerButton;
