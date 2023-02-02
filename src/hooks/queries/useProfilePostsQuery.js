import { useDispatch } from "react-redux";

import { PROFILE_POSTS_COUNT_PER_REQ } from "../../lib/config";

import {
  getProfilePosts,
  resetPosts,
} from "../../store/reducers/postsDataReducer";
import { resetComments } from "../../store/reducers/commentsDataReducer";

export default function useProfilePostsQuery() {
  const dispatch = useDispatch();

  function getProfilePostsQuery({ page = 1, hasMore = false, profileId }) {
    dispatch(
      getProfilePosts({
        limit: PROFILE_POSTS_COUNT_PER_REQ,
        id: profileId,
        hasMore,
        page,
      })
    );
  }

  function resetState() {
    dispatch(resetPosts());
    dispatch(resetComments());
  }

  return { getProfilePostsQuery, resetState };
}
