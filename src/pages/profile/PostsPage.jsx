/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectPosts } from "../../store/selectors/postSelectors";

import { useProfilePostsQuery, useDocTitle } from "../../hooks";

import {
  PostsPageContainer,
  PostsPageSideBar,
  PostsPageContent,
} from "../../components/PostsPage";

function PostPage() {
  useDocTitle("Profile");
  
  const { posts, hasMore } = useSelector(selectPosts);

  const { getProfilePostsQuery, resetState } = useProfilePostsQuery();

  const { id } = useParams();

  const [page, setPage] = useState(1);
  async function handleNext() {
    getProfilePostsQuery({ page: page + 1, hasMore: true, profileId: id });
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    getProfilePostsQuery({ profileId: id });

    return () => resetState();
  }, [id]);

  return (
    <PostsPageContainer>
      <PostsPageSideBar />
      <PostsPageContent posts={posts} infinite={{ handleNext, hasMore }} />
    </PostsPageContainer>
  );
}

export default PostPage;
