import { usePost } from "hooks/layoutBased";

import { Post, BTN } from "components/Layouts";
import styles from "./styles/tagReviewPostBody.module.scss";

function ReviewPostBody({
  onHiddens,
  post,
  removeTagHandler,
  showOnProfileHandler,
}) {
  const { activatePostMediaHandler } = usePost();

  return (
    <div className={styles.postWrapper}>
      <Post data={post} activatePostMediaHandler={activatePostMediaHandler} />
      <div className={styles.reviewBtnBox}>
        {!onHiddens && (
          <>
            <BTN
              onClick={() => removeTagHandler(post._id)}
              className={styles.removeTagBtn}
            >
              remove tag
            </BTN>
            <BTN
              onClick={() => showOnProfileHandler(post._id, false)}
              className={styles.hideBtn}
            >
              hide from profile
            </BTN>
          </>
        )}
        <BTN
          onClick={() => showOnProfileHandler(post._id, true)}
          className={styles.addBtn}
        >
          add to profile
        </BTN>
      </div>
    </div>
  );
}

export default ReviewPostBody;
