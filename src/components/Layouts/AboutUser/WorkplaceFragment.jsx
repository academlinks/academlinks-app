import FragmentWrapper from "./FragmentWrapper";
import { CaseIcon } from "../Icons/icons";
import { formatDate } from "../../../lib";

function WorkplaceFragment({
  data,
  editable = false,
  onEdit = () => {},
  deleteAble = false,
  onDelete = () => {},
}) {
  return (
    data && (
      <FragmentWrapper
        icon={<CaseIcon />}
        editable={editable}
        onEdit={onEdit}
        deleteAble={deleteAble}
        onDelete={onDelete}
      >
        <p>
          Worked in <strong>{data.institution}</strong> as{" "}
          <strong>{data.position}</strong>
          {data.workingYears && (
            <>
              <span> from </span>
              <strong>
                {formatDate(data.workingYears?.from, "verbal")}
              </strong>{" "}
              to <strong>{formatDate(data.workingYears?.to, "verbal")}</strong>
            </>
          )}
        </p>
        <p>{data.description}</p>
      </FragmentWrapper>
    )
  );
}

export default WorkplaceFragment;
