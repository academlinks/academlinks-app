/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { selectActiveUser } from "store/selectors/activeUserSelectors";

function useRestrictPrivateRoute() {
  const navigate = useNavigate();

  const activeUser = useSelector(selectActiveUser);
  const { id: profileId } = useParams();

  useEffect(() => {
    if (activeUser._id !== profileId && activeUser.isAuthenticated)
      navigate(-1, { replace: true });
  }, [activeUser._id, activeUser.isAuthenticated, profileId]);
}

export default useRestrictPrivateRoute;
