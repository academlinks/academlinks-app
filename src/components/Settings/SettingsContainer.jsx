import { useEffect } from "react";
import styles from "./components/styles/settingsContainer.module.scss";

function SettingsContainer({ children }) {
  useEffect(() => {
    return () => localStorage.removeItem("settings-target");
  }, []);

  return <div className={styles.settingsContainer}>{children}</div>;
}

export default SettingsContainer;
