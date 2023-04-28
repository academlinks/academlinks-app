/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectActiveUser } from "store/selectors/activeUserSelectors";

export default function useIsAuthenticatedUser() {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  const { isAuthenticated } = useSelector(selectActiveUser);
  const ide = JSON.parse(localStorage.getItem("academind_passport"));

  useEffect(() => {
    if (isAuthenticated && ide) setIsAuthenticatedUser(true);
    else setIsAuthenticatedUser(false);
  }, [isAuthenticated]);

  return { isAuthenticatedUser };
}
