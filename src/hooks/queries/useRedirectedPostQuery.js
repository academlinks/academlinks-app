import { useDispatch } from "react-redux";
import {
  getPost,
  resetPosts,
  resetErrorOnPostOperation,
  resetErrorOnLoadingState,
} from "../../store/reducers/postsDataReducer";

export default function useRedirectedPostQuery() {
  const dispatch = useDispatch();

  function getPostQuery(id) {
    dispatch(getPost(id));
  }

  function resetState() {
    dispatch(resetPosts());
  }

  function handleResetPostOperationalError() {
    dispatch(resetErrorOnPostOperation());
  }

  function handleResetPostLoadingError() {
    dispatch(resetErrorOnLoadingState());
  }

  return {
    getPostQuery,
    resetState,
    handleResetPostOperationalError,
    handleResetPostLoadingError,
  };
}
