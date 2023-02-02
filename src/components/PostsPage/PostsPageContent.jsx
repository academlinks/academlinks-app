import { useForeignUser } from "../../hooks";

import { CreatePost } from "../Layouts";
import PostsPagePostsList from "./components/PostsPagePostsList";

function PostsPageContent({ posts, infinite }) {
  const { isActiveUser } = useForeignUser("basedOnLocation");

  return (
    <>
      <PostsPagePostsList data={posts} infinite={infinite}>
      {isActiveUser &&  <CreatePost />}
      </PostsPagePostsList>
    </>
  );
}

export default PostsPageContent;
