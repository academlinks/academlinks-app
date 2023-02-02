import { useSelector } from "react-redux";
import { selectSettingsStatus } from "../../store/selectors/settingsSelector";

import styles from "./components/styles/sideBar.module.scss";
import UserConstantInfo from "./components/UserConstantInfo";
import EditableList from "./components/EditableList";

function SideBar() {
  const { target } = useSelector(selectSettingsStatus);

  return (
    <aside
      className={`${styles.sideBarContainer} ${target ? styles.active : ""}`}
    >
      <UserConstantInfo />
      <EditableList />
    </aside>
  );
}

export default SideBar;
