/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useDocTitle } from "hooks/layoutBased";
import { useFriendsQuery } from "hooks/queries";
import { resetFriends } from "store/reducers/friendsReducer";
import { selectAllFriendsPageState } from "store/selectors/friendsSelector";

import { AllFriends as Friends } from "components/FriendsPage";
import { Spinner, Error } from "components/Layouts";

function AllFriendsPage() {
  useDocTitle("Friends");

  const dispatch = useDispatch();
  const { id: userId } = useParams();

  const { getAllFriendsQuery } = useFriendsQuery();
  const {
    loadingState: { loading, error, message },
  } = useSelector(selectAllFriendsPageState);

  useEffect(() => {
    getAllFriendsQuery(userId);
    return () => dispatch(resetFriends());
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && <Friends />}
      {error && <Error msg={message} />}
    </>
  );
}

export default AllFriendsPage;
