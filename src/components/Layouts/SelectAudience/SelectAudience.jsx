import { useState } from "react";

import TriggerButton from "./TriggerButton";
import OptionsList from "./OptionsList";
import styles from "./selectAudience.module.scss";

function SelectAudience({
  handleAudience,
  audience,
  isBlogPostAudience = false,
}) {
  const [activateSelection, setActivateSelection] = useState(false);

  function handleSelection(value) {
    setActivateSelection(false);
    handleAudience(value);
  }

  return (
    <div
      className={`${styles.selectAudienceBox} ${
        activateSelection ? styles.activeSelection : ""
      }`}
    >
      <TriggerButton
        setActivateSelection={setActivateSelection}
        audience={audience}
      />
      {activateSelection && (
        <OptionsList
          handleSelection={handleSelection}
          isBlogPostAudience={isBlogPostAudience}
        />
      )}
    </div>
  );
}

export default SelectAudience;
