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
    <div
      className={`${styles.postWrapper} ${onHiddens ? styles.hiddenPosts : ""}`}
    >
      <Post data={post} activatePostMediaHandler={activatePostMediaHandler} />
      <div className={styles.reviewBtnBox}>
        {!onHiddens && (
          <>
            <BTN
              btnType="deleteRadial"
              className={styles.removeTagBtn}
              onClick={() => removeTagHandler(post._id)}
            >
              remove tag
            </BTN>
            <BTN
              btnType="secondaryRadial"
              className={styles.hideBtn}
              onClick={() => showOnProfileHandler(post._id, false)}
            >
              hide from profile
            </BTN>
          </>
        )}
        <BTN
          btnType="primaryRadial"
          className={styles.addBtn}
          onClick={() => showOnProfileHandler(post._id, true)}
        >
          add to profile
        </BTN>
      </div>
    </div>
  );
}

export default ReviewPostBody;
