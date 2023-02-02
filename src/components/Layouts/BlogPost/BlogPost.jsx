import { useMemo } from "react";
import { extractRootEndPointFromImg } from "../../../lib";

import styles from "./components/styles/blogPost.module.scss";
import { ReviewUserInteraction } from "./components";
import {
  BlogPostIdentifier,
  ShowMoreInlineBTN,
  Image,
  ParagraphsGenerator,
} from "../../Layouts";

function BlogPost({ post, limitation = 1500, className, referenced, id }) {
  const article = useMemo(
    () =>
      post?.article?.length > limitation
        ? `${post.article?.slice(0, limitation)}...`
        : post?.article,
    [limitation, post.article]
  );

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
          <ParagraphsGenerator text={article} />
          {post?.article?.length > limitation && (
            <ShowMoreInlineBTN
              path={`/blog/${post._id}`}
              query={{ user: post.userName }}
              asLink={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
