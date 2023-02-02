import FragmentWrapper from "./FragmentWrapper";
import { MaleIcon, FemaleIcon } from "../Icons/icons";

function GenderFragment({
  data,
  editable = false,
  onEdit = () => {},
  deleteAble = false,
  onDelete = () => {},
}) {
  return (
    data && (
      <FragmentWrapper
        icon={
          data === "male" ? (
            <MaleIcon />
          ) : data === "female" ? (
            <FemaleIcon />
          ) : null
        }
        editable={editable}
        onEdit={onEdit}
        deleteAble={deleteAble}
        onDelete={onDelete}
      >
        <p>
          Gender <strong>{data}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default GenderFragment;
