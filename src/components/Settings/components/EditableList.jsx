/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useSettings, useWindowDimention } from "../../../hooks";
import { selectSettingsStatus } from "../../../store/selectors/settingsSelector";
import { editableKeysShort, detailedKeys } from "../config";

import styles from "./styles/editableList.module.scss";

function EditableList() {
  const { target, headingTitle, isEditing } = useSelector(selectSettingsStatus);
  const { handleMenuDetailedTarget, handleMenuEditableTarget } = useSettings();

  const [isMounting, setIsMounting] = useState(true);

  const { width } = useWindowDimention();

  useEffect(() => {
    if (isMounting || width <= 680) return;

    localStorage.setItem(
      "settings-target",
      JSON.stringify({
        key: target,
        label: headingTitle,
      })
    );
  }, [target]);

  useEffect(() => {
    if (width <= 680) return;

    const lastTarget = localStorage.getItem("settings-target")
      ? JSON.parse(localStorage.getItem("settings-target"))
      : null;

    if (lastTarget) handleMenuDetailedTarget(false, lastTarget);
    else
      handleMenuDetailedTarget(false, {
        key: "showAll",
        label: "all details",
      });

    setIsMounting(false);
  }, []);

  return (
    <div className={styles.editableNavList}>
      {detailedKeys.map((detailedKey) => (
        <button
          onClick={() => handleMenuDetailedTarget(isEditing, detailedKey)}
          className={target === detailedKey.key ? styles.active : ""}
          key={detailedKey.id}
        >
          {detailedKey.label}
        </button>
      ))}
      {editableKeysShort.map((editableKey) => (
        <button
          onClick={() => handleMenuEditableTarget(editableKey)}
          className={target === editableKey.key ? styles.active : ""}
          key={editableKey.id}
        >
          {editableKey.label}
        </button>
      ))}
    </div>
  );
}

export default EditableList;
