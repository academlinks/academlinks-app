import { DraftReader } from "../../";
import styles from "./styles/postDescription.module.scss";

function PostDescription({ description, className }) {
  return (
    <div className={`${styles.postDescription} ${className || ""}`}>
      <DraftReader text={description} limit={100} />
    </div>
  );
}

export default PostDescription;
