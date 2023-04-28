import { formatDate } from "lib";

import { CalendarIcon } from "../Icons/icons";
import FragmentWrapper from "./FragmentWrapper";

function BirthdateFragment({
  data,
  editable = false,
  onEdit = () => {},
  deleteAble = false,
  onDelete = () => {},
}) {
  return (
    data && (
      <FragmentWrapper
        icon={<CalendarIcon />}
        editable={editable}
        onEdit={onEdit}
        deleteAble={deleteAble}
        onDelete={onDelete}
      >
        <p>
          Birthdate <strong>{formatDate(data, "verbal")}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default BirthdateFragment;
