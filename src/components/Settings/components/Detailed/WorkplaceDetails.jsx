import { useSelector } from "react-redux";

import { editableKeys } from "../../config";
import { useSettings } from "hooks/layoutBased";
import { useSettingsQuery } from "hooks/queries";

import AddBTN from "./AddBTN";
import { WorkplaceFragment } from "components/Layouts";
import styles from "../styles/detailed.module.scss";

function WorkplaceDetails({ editable, withBtn = true }) {
  const workplaces = useSelector(({ settings }) => settings.userInfo.workplace);

  const { handleEditingTarget, handleUpdateWorkplace } = useSettings();
  const { deleteUserNestedInfoQuery } = useSettingsQuery();

  return (
    <>
      {withBtn && (
        <AddBTN
          label="workplace"
          onClick={() => {
            handleEditingTarget({
              editableKey: editableKeys.changeWorkplace,
              pathParams: { operation: "add" },
            });
          }}
        />
      )}

      {workplaces && (
        <div className={`${styles.listedContent} ${styles.fragmentsContainer}`}>
          {workplaces.map((workplace) => (
            <WorkplaceFragment
              data={workplace}
              key={workplace._id}
              deleteAble={true}
              editable={editable === false ? false : true}
              onEdit={() => {
                handleUpdateWorkplace(workplace);
                handleEditingTarget({
                  editableKey: editableKeys.changeWorkplace,
                  pathParams: { operation: "update", docId: workplace._id },
                });
              }}
              onDelete={() =>
                deleteUserNestedInfoQuery({
                  field: "workplace",
                  docId: workplace._id,
                })
              }
            />
          ))}
        </div>
      )}
    </>
  );
}

export default WorkplaceDetails;
