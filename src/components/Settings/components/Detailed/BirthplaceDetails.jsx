import { useSelector } from "react-redux";

import { useSettings, useSettingsQuery } from "../../../../hooks";
import { editableKeys } from "../../config";

import { LivingplaceFragment } from "../../../Layouts";
import AddBTN from "./AddBTN";
import styles from "../styles/detailed.module.scss";

function BirthplaceDetails({ editable, withBtn = true }) {
  const birthPlace = useSelector(({ settings }) => settings.userInfo.from);

  const { handleEditingTarget, handleUpdateBirthplace } = useSettings();
  const { deleteUserInfoQuery } = useSettingsQuery();

  return (
    <>
      {withBtn && !birthPlace && (
        <AddBTN
          label="birthplace"
          onClick={() => {
            handleEditingTarget({
              editableKey: editableKeys.changeBirthplace,
              pathParams: { operation: "add" },
            });
          }}
        />
      )}
      {birthPlace && (
        <div className={styles.fragmentsContainer}>
          <LivingplaceFragment
            data={birthPlace}
            // editable={false}
            editable={editable === false ? false : true}
            onEdit={() => {
              handleUpdateBirthplace(birthPlace);
              handleEditingTarget({
                editableKey: editableKeys.changeBirthplace,
                pathParams: { operation: "update" },
              });
            }}
            onDelete={() => deleteUserInfoQuery({ field: "from" })}
          />
        </div>
      )}
    </>
  );
}

export default BirthplaceDetails;
