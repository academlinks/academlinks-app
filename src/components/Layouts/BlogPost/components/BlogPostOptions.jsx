import { useState } from "react";

import styles from "./styles/blogPostOptions.module.scss";
import BlogPostOptionsBody from "./BlogPostOptionsBody";

import { DotsHorizontalIcon } from "components/Layouts/Icons";

function BlogPostOptions({ postId }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.blogPostOptions}>
      <button
        className={styles.blogPostOptBtn}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="post-options"
      >
        <DotsHorizontalIcon />
      </button>
      {open && <BlogPostOptionsBody postId={postId} />}
    </div>
  );
}

export default BlogPostOptions;
