import { formatDate } from "../../../lib";

import FragmentWrapper from "./FragmentWrapper";
import { GraduationIcon } from "../../Layouts/Icons/icons";

function EducationFragment({
  data,
  editable = false,
  onEdit = () => {},
  deleteAble = false,
  onDelete = () => {},
}) {
  return (
    data && (
      <FragmentWrapper
        icon={<GraduationIcon />}
        editable={editable}
        onEdit={onEdit}
        deleteAble={deleteAble}
        onDelete={onDelete}
      >
        <p>
          Studied in <strong>{data.collage}</strong> at{" "}
          <strong>{data.faculty}</strong> as <strong>{data.degree}</strong> from{" "}
          <strong>{formatDate(data.years?.from, "verbal")}</strong> to{" "}
          <strong>{formatDate(data.years?.to, "verbal")}</strong>
        </p>
        <p>{data.description}</p>
      </FragmentWrapper>
    )
  );
}

export default EducationFragment;
