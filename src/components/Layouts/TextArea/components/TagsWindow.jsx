import styles from "./styles/tagsWindow.module.scss";
import { Image } from "../../../Layouts";

function TagsWindow({ result, handleCandidate }) {
  return (
    <div className={styles.tagsWindow} id="tags-modal-window">
      {result.map((user) => (
        <div
          className={styles.tagCandidate}
          key={user._id}
          onClick={() => handleCandidate(user)}
        >
          <Image src={user.profileImg} />
          <p>{user.userName}</p>
        </div>
      ))}
    </div>
  );
}

export default TagsWindow;
