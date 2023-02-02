import { formatDate } from "../../../lib";

import FragmentWrapper from "./FragmentWrapper";
import { RotateIcon } from "../Icons/icons";

function RegisterFragment({
  data,
  editable = false,
  onEdit = () => {},
  deleteAble = false,
  onDelete = () => {},
}) {
  return (
    data && (
      <FragmentWrapper
        icon={<RotateIcon />}
        editable={editable}
        onEdit={onEdit}
        deleteAble={deleteAble}
        onDelete={onDelete}
      >
        <p>
          Joined at <strong>{formatDate(data, "verbal")}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default RegisterFragment;
