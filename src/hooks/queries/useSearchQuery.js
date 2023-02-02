import { useDispatch } from "react-redux";

import {
  searchUser,
  resetSearchResult,
  resetSearchError,
} from "../../store/reducers/userReducer";

export default function useSearchQuery() {
  const dispatch = useDispatch();

  function searchUserQuery(key) {
    dispatch(searchUser(key));
  }

  function handleResetUserSearchResultAndState() {
    dispatch(resetSearchResult());
    dispatch(resetSearchError());
  }

  return {
    searchUserQuery,
    handleResetUserSearchResultAndState,
  };
}
