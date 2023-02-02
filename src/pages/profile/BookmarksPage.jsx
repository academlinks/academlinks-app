/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectPosts,
  selectPostsLoadingState,
} from "../../store/selectors/postSelectors";

import {
  useRestrictPrivateRoute,
  useBookmarksQuery,
  useDocTitle,
} from "../../hooks";

import Bookmarks from "../../components/BookmarkPage/Bookmarks";
import BookmarksContainer from "../../components/BookmarkPage/BookmarksContainer";
import { Spinner, Error, EmptyContentMessage } from "../../components/Layouts";

function BookmarksPage() {
  useDocTitle("Profile | Bookmarks");

  useRestrictPrivateRoute();

  const { posts, hasMore } = useSelector(selectPosts);

  const { loading, error, message } = useSelector(selectPostsLoadingState);
  const { getBookmarksQuery, resetState } = useBookmarksQuery();

  const [page, setPage] = useState(1);
  async function handleNext() {
    getBookmarksQuery({ page: page + 1, hasMore: true });
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    getBookmarksQuery({});
    return () => resetState();
  }, []);

  return (
    <BookmarksContainer>
      {loading && <Spinner />}
      {!loading && !error && (
        <Bookmarks hasMore={hasMore} handleNext={handleNext} posts={posts} />
      )}
      {error && <Error msg={message} />}
      {!loading && !posts[0] && !error && (
        <EmptyContentMessage message="there are no bookmarks yet" />
      )}
    </BookmarksContainer>
  );
}

export default BookmarksPage;
