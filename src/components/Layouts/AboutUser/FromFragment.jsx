import FragmentWrapper from "./FragmentWrapper";
import { LocationIcon } from "../Icons/icons";

function FromFragment({
  data,
  editable = false,
  onEdit = () => {},
  deleteAble = false,
  onDelete = () => {},
}) {
  return (
    data && (
      <FragmentWrapper
        icon={<LocationIcon />}
        editable={editable}
        onEdit={onEdit}
        deleteAble={deleteAble}
        onDelete={onDelete}
      >
        <p>
          From <strong>{data.city}</strong> <strong>{data.country}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default FromFragment;
