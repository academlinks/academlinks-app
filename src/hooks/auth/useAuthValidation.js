import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectActiveUser } from "store/selectors/activeUserSelectors";
import { resetActiveUser } from "store/reducers/activeUserReducer";

function useAuthValidation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { isAuthenticated } = useSelector(selectActiveUser);

  const ide = JSON.parse(localStorage.getItem("academind_passport"));
  const authorisedRoutes = useMemo(
    () => process.env.REACT_APP_AUTHORISED_ROUTES?.split(","),
    []
  );

  useEffect(() => {
    if (
      authorisedRoutes.some(
        (route) => route === pathname || pathname.startsWith(route)
      ) &&
      !ide
    ) {
      if (isAuthenticated) dispatch(resetActiveUser());
      navigate("/", { replace: true });
    }
  }, [pathname, navigate, authorisedRoutes, ide, isAuthenticated, dispatch]);
}

export default useAuthValidation;
