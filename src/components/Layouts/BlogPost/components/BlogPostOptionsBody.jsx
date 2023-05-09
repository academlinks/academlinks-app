import { useSavePostQuery } from "hooks/queries";

import { Spinner } from "components/Layouts";
import styles from "./styles/blogPostOptionsBody.module.scss";

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
          <button onClick={handleSavePost} data-options-modal-button>
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
