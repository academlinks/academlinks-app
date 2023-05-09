import { LikeIcon } from "components/Layouts/Icons";
import { DraftReader } from "components/Layouts";
import styles from "./styles/commentContent.module.scss";

/**
 * renders comment text and options
 */
function CommentContent({ text, likesCount }) {
  return (
    <div className={styles.commentContent}>
      <div className={styles.commentText}>
        <DraftReader text={text} limit={100} />
      </div>
      {likesCount > 0 && (
        <p className={styles.commentReactions}>
          <LikeIcon />
          <span>{likesCount}</span>
        </p>
      )}
    </div>
  );
}

export default CommentContent;
