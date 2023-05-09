import { useForeignUser } from "hooks/auth";

import { CreatePost } from "components/Layouts";
import PostsPagePostsList from "./components/PostsPagePostsList";
import styles from "./components/styles/postsPageContent.module.scss"

function PostsPageContent({ posts, infinite }) {
  const { isActiveUser } = useForeignUser("basedOnLocation");

  return (
    <>
      <PostsPagePostsList data={posts} infinite={infinite}>
        <div className={styles.postsPageCreatePost}>
          {isActiveUser && <CreatePost />}
        </div>
      </PostsPagePostsList>
    </>
  );
}

export default PostsPageContent;
