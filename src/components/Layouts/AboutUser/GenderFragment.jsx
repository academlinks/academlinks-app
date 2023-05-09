import FragmentWrapper from "./FragmentWrapper";
import { MaleIcon, FemaleIcon } from "components/Layouts/Icons";

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
          <strong>{data}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default GenderFragment;
