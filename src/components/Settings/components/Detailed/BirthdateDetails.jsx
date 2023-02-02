import { useSelector } from "react-redux";

import { useSettings, useSettingsQuery } from "../../../../hooks";
import { editableKeys } from "../../config";

import { BirthdateFragment } from "../../../Layouts";
import AddBTN from "./AddBTN";
import styles from "../styles/detailed.module.scss";

function BirthdateDetails({ editable, withBtn = true }) {
  const birthDate = useSelector(({ settings }) => settings.userInfo.birthDate);

  const { handleEditingTarget, handleUpdateBirthdate } = useSettings();
  const { deleteUserInfoQuery } = useSettingsQuery();

  return (
    <>
      {withBtn && !birthDate && (
        <AddBTN
          label="birthdate"
          onClick={() => {
            handleEditingTarget({
              editableKey: editableKeys.changeBirthdate,
              pathParams: { operation: "add" },
            });
          }}
        />
      )}
      {birthDate && (
        <div className={styles.fragmentsContainer}>
          <BirthdateFragment
            data={birthDate}
            editable={editable === false ? false : true}
            deleteAble={true}
            onEdit={() => {
              handleEditingTarget({
                editableKey: editableKeys.changeBirthdate,
                pathParams: { operation: "update" },
              });
              handleUpdateBirthdate(birthDate);
            }}
            onDelete={() => deleteUserInfoQuery({ field: "birthDate" })}
          />
        </div>
      )}
    </>
  );
}

export default BirthdateDetails;
