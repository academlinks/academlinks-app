import { formatDate } from "lib";

import FragmentWrapper from "./FragmentWrapper";
import { CaseIcon } from "components/Layouts/Icons";

function WorkplaceFragment({
  data,
  current,
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
          <span>{current ? "Workes in" : "Worked in"}</span>&nbsp;
          <strong>{data.institution}</strong> as&nbsp;
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
