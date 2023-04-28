import { extractRootEndPointFromImg } from "lib";

import { ReviewUserInteraction } from "./components";
import { BlogPostIdentifier, Image, DraftReader } from "components/Layouts";
import styles from "./components/styles/blogPost.module.scss";

function BlogPost({ post, limitation = 170, className, referenced, id }) {
  return (
    <div className={`${styles.blogPost} ${className || ""}`} id={id ? id : ""}>
      {post?.media?.[0] && (
        <Image
          src={extractRootEndPointFromImg(post.media?.[0])}
          className={styles.blogPostMedia}
        />
      )}
      <div className={styles.blogPostInfo}>
        <div className={styles.devideRow}>
          <BlogPostIdentifier
            title={post.title}
            author={post.author}
            tags={post.tags}
            labels={post.labels}
            category={post.category}
            audience={post.audience}
            postId={post._id}
            createdAt={post.createdAt}
          />
          {!referenced && (
            <ReviewUserInteraction
              commentsAmount={post?.commentsAmount}
              likesAmount={post.likesAmount}
              dislikesAmount={post.dislikesAmount}
              postId={post._id}
            />
          )}
        </div>
        <div className={styles.blogPostShortDesc} data-article-text>
          <DraftReader
            text={post.article}
            limit={limitation}
            asLink={true}
            path={`/blog/${post._id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
