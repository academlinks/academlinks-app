import { useSelector } from "react-redux";

import { editableKeys } from "../../config";
import { useSettings } from "hooks/layoutBased";
import { useSettingsQuery } from "hooks/queries";

import AddBTN from "./AddBTN";
import { EducationFragment } from "components/Layouts";
import styles from "../styles/detailed.module.scss";

function EducationDetails({ editable, withBtn = true }) {
  const userEducation = useSelector(
    ({ settings }) => settings.userInfo.education
  );

  const { handleEditingTarget, handleUpdateEducation } = useSettings();
  const { deleteUserNestedInfoQuery } = useSettingsQuery();

  return (
    <>
      {withBtn && (
        <AddBTN
          label="education"
          onClick={() => {
            handleEditingTarget({
              editableKey: editableKeys.changeEducation,
              pathParams: { operation: "add" },
            });
          }}
        />
      )}
      
      {userEducation && (
        <div className={`${styles.listedContent} ${styles.fragmentsContainer}`}>
          {userEducation.map((edu) => (
            <EducationFragment
              data={edu}
              key={edu._id}
              deleteAble={true}
              editable={editable === false ? false : true}
              onEdit={() => {
                handleUpdateEducation(edu);
                handleEditingTarget({
                  editableKey: editableKeys.changeEducation,
                  pathParams: { operation: "update", docId: edu._id },
                });
              }}
              onDelete={() =>
                deleteUserNestedInfoQuery({
                  field: "education",
                  docId: edu._id,
                })
              }
            />
          ))}
        </div>
      )}
    </>
  );
}

export default EducationDetails;
