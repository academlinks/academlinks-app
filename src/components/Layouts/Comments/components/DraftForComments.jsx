import { DraftEditor } from "components/Layouts";
import { SendIcon } from "components/Layouts/Icons";
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
        text={text}
        setText={setCommentText}
        className={styles.draft}
        placeholder="write comment..."
      />

      <button className={styles.sendBtn} type="submit">
        <SendIcon />
      </button>
    </form>
  );
}

export default DraftForComments;
