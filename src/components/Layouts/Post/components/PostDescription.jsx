import { DraftReader } from "components/Layouts";
import styles from "./styles/postDescription.module.scss";

function PostDescription({ description, className }) {
  return (
    <div
      className={`${styles.postDescription} ${
        description ? styles.spaceY : ""
      } ${className || ""}`}
    >
      <DraftReader text={description} limit={150} />
    </div>
  );
}

export default PostDescription;
