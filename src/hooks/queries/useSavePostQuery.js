/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import useHelperQuery from "./useHelperQuery";

import { removeBookmark } from "../../store/reducers/postsDataReducer";
import usePostQuery from "./usePostQuery";

function useSavePostQuery(postId) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { savePostQuery } = usePostQuery();

  const { loading, optionsRules, getOptionsRulesQuery, setOptionsRules } =
    useHelperQuery();

  function removeBookmarkHandler() {
    if (pathname.endsWith("bookmarks")) dispatch(removeBookmark(postId));
  }

  function handleSavePost() {
    savePostQuery(postId);

    optionsRules?.isBookmarked && removeBookmarkHandler();

    setOptionsRules((prevState) => ({
      ...prevState,
      isBookmarked: !prevState.isBookmarked,
    }));
  }

  useEffect(() => {
    getOptionsRulesQuery(postId);
  }, [postId]);

  return { loading, optionsRules, handleSavePost };
}

export default useSavePostQuery;
