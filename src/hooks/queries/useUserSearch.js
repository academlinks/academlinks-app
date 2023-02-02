/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useSearchQuery, useBlurOnBody } from "../";
import { selectUserSearchResult } from "../../store/selectors/userSelectors";

export default function useUserSearch({
  blurClassNames,
  actionOnChoose = () => {},
}) {
  //   const { blurClassNames, actionOnChoose } = params;

  const [activeWindow, setActiveWindow] = useState(false);
  const [key, setKey] = useState("");

  const { searchUserQuery, handleResetUserSearchResultAndState } =
    useSearchQuery();

  const handleOnBlur = useCallback(() => {
    setKey("");
    setActiveWindow(false);
    handleResetUserSearchResultAndState();
  }, []);

  const onFocusHandler = () => setActiveWindow(true);

  const { blur, onFocus } = useBlurOnBody(
    onFocusHandler,
    handleOnBlur,
    blurClassNames
  );

  function onChooseHandler() {
    setKey("");
    setActiveWindow(false);
    handleResetUserSearchResultAndState();
  }

  const result = useSelector(selectUserSearchResult);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (key === "" && !result[0]) return;
      else if (key === "" && result[0])
        return handleResetUserSearchResultAndState();
      searchUserQuery(key.toLowerCase());
    }, 1000);

    return () => clearTimeout(timer);
  }, [key]);

  return {
    activeWindow,
    setActiveWindow,
    key,
    setKey,
    onFocus,
    blur,
    result,
    onChooseHandler,
  };
}
