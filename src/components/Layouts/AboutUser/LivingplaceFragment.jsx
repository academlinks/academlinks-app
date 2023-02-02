import FragmentWrapper from "./FragmentWrapper";
import { LocationIcon } from "../Icons/icons";

function LivingplaceFragment({
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
          Lives in <strong>{data.city}</strong> <strong>{data.country}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default LivingplaceFragment;
