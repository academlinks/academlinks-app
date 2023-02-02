import { useSelector } from "react-redux";
import { selectSettingsStatus } from "../../../store/selectors/settingsSelector";

import { useSettings } from "../../../hooks";

import styles from "./styles/content.module.scss";
import { GoBackBTN } from "../../Layouts";

function ContentContainer({ children }) {
  const { target } = useSelector(selectSettingsStatus);
  const { handleGoBack } = useSettings();

  return (
    <div
      className={`${styles.contentContainer} ${target ? styles.active : ""}`}
    >
      <div className={styles.content}>
        <GoBackBTN
          handler={handleGoBack}
          className={styles.settingsGoBackBtn}
        />
        {children}
      </div>
    </div>
  );
}

export default ContentContainer;
