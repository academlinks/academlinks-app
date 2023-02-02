import { useSavePostQuery } from "../../../../hooks";

import styles from "./styles/blogPostOptionsBody.module.scss";
import { Spinner } from "../../../Layouts";
import {
  // ErrorIcon,
  BookmarkOutlineIcon,
  BookmarkFillIcon,
} from "../../../Layouts/Icons/icons";

function BlogPostOptionsBody({ postId }) {
  const { loading, optionsRules, handleSavePost } = useSavePostQuery(postId);

  return (
    <div className={styles.blogPostOptionsList}>
      {loading && <Spinner />}
      {!loading && (
        <>
          <button onClick={handleSavePost} data-modal-sm-btn>
            {optionsRules?.isBookmarked && <BookmarkFillIcon />}
            {!optionsRules?.isBookmarked && <BookmarkOutlineIcon />}
            <span>save</span>
          </button>
          {/* <button data-modal-sm-btn>
            <ErrorIcon />
            report
          </button> */}
        </>
      )}
    </div>
  );
}

export default BlogPostOptionsBody;
