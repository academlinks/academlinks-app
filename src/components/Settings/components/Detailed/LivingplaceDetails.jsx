import { useSelector } from "react-redux";

import { editableKeys } from "../../config";
import { useSettings } from "hooks/layoutBased";
import { useSettingsQuery } from "hooks/queries";

import AddBTN from "./AddBTN";
import { LivingplaceFragment } from "components/Layouts";
import styles from "../styles/detailed.module.scss";

function LivingplaceDetails({ editable, withBtn = true }) {
  const currentLivingPlace = useSelector(
    ({ settings }) => settings.userInfo.currentLivingPlace
  );

  const { handleEditingTarget, handleUpdateLivingplace } = useSettings();
  const { deleteUserInfoQuery } = useSettingsQuery();

  return (
    <>
      {withBtn && !currentLivingPlace && (
        <AddBTN
          label="livingplace"
          onClick={() => {
            handleEditingTarget({
              editableKey: editableKeys.changeLivingplace,
              pathParams: { operation: "add" },
            });
          }}
        />
      )}
      {currentLivingPlace && (
        <div className={styles.fragmentsContainer}>
          <LivingplaceFragment
            data={currentLivingPlace}
            editable={editable === false ? false : true}
            onEdit={() => {
              handleUpdateLivingplace(currentLivingPlace);
              handleEditingTarget({
                editableKey: editableKeys.changeLivingplace,
                pathParams: { operation: "update" },
              });
            }}
            onDelete={() =>
              deleteUserInfoQuery({ field: "currentLivingPlace" })
            }
          />
        </div>
      )}
    </>
  );
}

export default LivingplaceDetails;
