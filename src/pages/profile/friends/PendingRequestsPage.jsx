/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDocTitle } from "hooks/layoutBased";
import { useFriendsQuery } from "hooks/queries";
import { useRestrictPrivateRoute } from "hooks/auth";

import { selectPendingRequestsPageState } from "store/selectors/friendsSelector";
import { selectActiveUserId } from "store/selectors/activeUserSelectors";
import { resetFriends } from "store/reducers/friendsReducer";

import { PendingRequests } from "components/FriendsPage";
import { Spinner, Error } from "components/Layouts";

function PendingRequestPage() {
  useDocTitle("Friends | Pending Requests");

  useRestrictPrivateRoute();

  const dispatch = useDispatch();

  const activeUserId = useSelector(selectActiveUserId);
  const {
    loadingState: { loading, error, message },
  } = useSelector(selectPendingRequestsPageState);

  const { getPendingRequestsQuery } = useFriendsQuery();

  useEffect(() => {
    getPendingRequestsQuery(activeUserId);
    return () => dispatch(resetFriends());
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && <PendingRequests />}
      {error && <Error msg={message} />}
    </>
  );
}

export default PendingRequestPage;
