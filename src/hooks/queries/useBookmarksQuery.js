import { useDispatch, useSelector } from "react-redux";

import { BOOKMARKS_POSTS_COUNT_PER_REQ } from "../../lib/config";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";

import {
  resetPosts,
  getBookmarks,
} from "../../store/reducers/postsDataReducer";
import { resetComments } from "../../store/reducers/commentsDataReducer";

export default function useBookmarksQuery() {
  const dispatch = useDispatch();

  const activeUserId = useSelector(selectActiveUserId);

  function getBookmarksQuery({ page = 1, hasMore = false }) {
    dispatch(
      getBookmarks({
        limit: BOOKMARKS_POSTS_COUNT_PER_REQ,
        id: activeUserId,
        hasMore,
        page,
      })
    );
  }

  function resetState() {
    dispatch(resetPosts());
    dispatch(resetComments());
  }

  return { getBookmarksQuery, resetState };
}
