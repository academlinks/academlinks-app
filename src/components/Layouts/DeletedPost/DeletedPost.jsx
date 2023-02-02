import { usePostQuery } from "../../../hooks";

import styles from "./deletedPost.module.scss";
import { ErrorIcon } from "../Icons/icons";
import PostOptions from "../PostOptions/PostOptions";

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
