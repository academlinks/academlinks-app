import { useSelector } from "react-redux";

import { useSettings } from "hooks/layoutBased";
import { selectSettingsStatus } from "store/selectors/settingsSelector";

import { GoBackBTN } from "components/Layouts";
import styles from "./styles/content.module.scss";

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
