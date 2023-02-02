import FragmentWrapper from "./FragmentWrapper";
import { EmailIcon } from "../Icons/icons";
import styles from "./styles/fragmentWrapper.module.scss";

function EmailFragment({
  data,
  editable = false,
  onEdit = () => {},
  deleteAble = false,
  onDelete = () => {},
}) {
  return (
    data && (
      <FragmentWrapper
        icon={<EmailIcon />}
        editable={editable}
        onEdit={onEdit}
        deleteAble={deleteAble}
        onDelete={onDelete}
      >
        <p>
          Email <strong className={styles.lower}>{data}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default EmailFragment;
