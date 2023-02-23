import DraftEditor from "../../TextArea/DraftEditor";
import { SendIcon } from "../../Icons/icons";
import styles from "./styles/draftForComments.module.scss";

function DraftForComments({ submitCommentQuery, setCommentText, text }) {
  return (
    <form
      className={styles.draftForCommentsForm}
      onSubmit={(e) => {
        e.preventDefault();
        submitCommentQuery();
      }}
    >
      <DraftEditor
        placeholder="write comment..."
        setText={setCommentText}
        text={text}
        className={styles.draft}
      />
      <button className={styles.sendBtn} type="submit">
        <SendIcon />
      </button>
    </form>
  );
}

export default DraftForComments;
// 