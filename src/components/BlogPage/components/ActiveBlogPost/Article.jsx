import { useNavigate } from "react-router-dom";

import { useIsAuthenticatedUser } from "hooks/auth";
import { useCreatePost } from "hooks/layoutBased";
import { usePostQuery, useProfileReviewQuery } from "hooks/queries";
import { destructurePostUpdateData } from "lib/destructurers";

import {
  BlogPostIdentifier,
  PostOptions,
  DraftReader,
} from "components/Layouts";
import styles from "./styles/article.module.scss";

function Article({ post }) {
  const { isAuthenticatedUser } = useIsAuthenticatedUser();

  const navigate = useNavigate();

  const { deletePostQuery, savePostQuery } = usePostQuery();
  const { removeTagQuery } = useProfileReviewQuery();
  const { handleUpdateBlogPostData } = useCreatePost({
    key: "blogPost",
    error: null,
  });

  function deleteHandler() {
    navigate({ pathname: "/blog" }, { replace: true });
    deletePostQuery(post._id);
  }

  return (
    <div className={styles.postIntro}>
      <div className={styles.articleHead}>
        <BlogPostIdentifier
          title={post.title}
          author={post.author}
          tags={post.tags}
          audience={post.audience}
          labels={post.labels}
          category={post.category}
          postId={post._id}
          createdAt={post.createdAt}
        />
        {isAuthenticatedUser && (
          <PostOptions
            audience={post.audience}
            isBlogPostOptions={true}
            postId={post._id}
            savePostHandler={() => savePostQuery(post._id)}
            deleteHandler={deleteHandler}
            removeTagHandler={() => removeTagQuery(post._id)}
            updateHandler={() =>
              handleUpdateBlogPostData(destructurePostUpdateData(post))
            }
          />
        )}
      </div>

      <div className={styles.article}>
        <DraftReader text={post.article} />
      </div>
    </div>
  );
}

export default Article;
