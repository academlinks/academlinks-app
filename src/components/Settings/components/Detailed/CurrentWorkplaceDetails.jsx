import { useSelector } from "react-redux";

import { useSettings } from "../../../../hooks";
import { editableKeys } from "../../config";

import { WorkplaceFragment } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

function CurrentWorkplaceDetails({ editable }) {
  const currentWorkplace = useSelector(
    ({ settings }) => settings.userInfo.currentWorkplace
  );

  const { handleEditingTarget, handleUpdateCurrentWorkplace } = useSettings();

  return (
    <>
      {currentWorkplace && (
        <div className={`${styles.listedContent} ${styles.fragmentsContainer}`}>
          <WorkplaceFragment
            data={currentWorkplace}
            deleteAble={false}
            editable={editable === false ? false : true}
            onEdit={() => {
              handleUpdateCurrentWorkplace(currentWorkplace);
              handleEditingTarget({
                editableKey: editableKeys.changeCurrentWorkplace,
                pathParams: { operation: "update" },
              });
            }}
          />
        </div>
      )}
    </>
  );
}

export default CurrentWorkplaceDetails;
