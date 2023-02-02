/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { resetFriends } from "../../../store/reducers/friendsReducer";
import { useFriendsQuery, useDocTitle } from "../../../hooks";
import { selectAllFriendsPageState } from "../../../store/selectors/friendsSelector";

import { AllFriends as Friends } from "../../../components/FriendsPage";
import { Spinner, Error } from "../../../components/Layouts";

function AllFriends() {
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

export default AllFriends;
