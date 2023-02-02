import styles from "./styles/tagsList.module.scss";
import { CloseIcon } from "../../Icons/icons";

function TagsList({ tags, deleteTagCandidate }) {
  return (
    <div className={styles.tagsList}>
      {tags?.map((tag) => (
        <span key={tag._id} className={styles.tagsListItem}>
          <label>{tag.userName}</label>
          <button onClick={() => deleteTagCandidate(tag._id)}>
            <CloseIcon />
          </button>
        </span>
      ))}
    </div>
  );
}

export default TagsList;
