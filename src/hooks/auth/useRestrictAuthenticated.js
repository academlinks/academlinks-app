import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectActiveUser } from "../../store/selectors/activeUserSelectors";

function useRestrictAuthenticated() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectActiveUser);

  const unauthorisedRoutes = useMemo(
    () => process.env.REACT_APP_UNAUTHORISED_ROUTES?.split(","),
    []
  );
  const ide = JSON.parse(localStorage.getItem("academind_passport"));

  useEffect(() => {
    if (
      unauthorisedRoutes.some(
        (route) => route === pathname || pathname.startsWith(route)
      ) &&
      ide
    ) {
      navigate("/feed", { replace: true });
    }
  }, [pathname, navigate, unauthorisedRoutes, ide, isAuthenticated]);
}

export default useRestrictAuthenticated;
