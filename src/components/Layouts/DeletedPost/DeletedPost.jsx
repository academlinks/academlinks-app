import { usePostQuery } from "hooks/queries";

import { ErrorIcon } from "components/Layouts/Icons";
import { PostOptions } from "components/Layouts";
import styles from "./deletedPost.module.scss";

function DeletedPost({ postId, showOptions = true }) {
  const { savePostQuery } = usePostQuery();

  return (
    <div className={styles.deletedPost} data-deleted-post>
      <ErrorIcon /> post is deleted or author changed the audience
      {showOptions && (
        <PostOptions
          savePostHandler={() => savePostQuery(postId)}
          postId={postId}
        />
      )}
    </div>
  );
}

export default DeletedPost;
