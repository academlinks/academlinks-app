/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { selectUserLoadingState } from "../../store/selectors/userSelectors";
import { useUserProfileQuery, useDocTitle } from "../../hooks";

import UserCover from "../../components/UserCover/UserCover";
import { Error, StandSpinner } from "../../components/Layouts";

function UserPage() {
  useDocTitle("Profile");

  const { id: profileId } = useParams();

  const [isMounting, setIsMounting] = useState(true);

  const { loading, error, message } = useSelector(selectUserLoadingState);

  const { getUserProfileQuery, handleResetError } = useUserProfileQuery();

  useEffect(() => {
    getUserProfileQuery(profileId);
    setIsMounting(false);
  }, [profileId]);

  return (
    <>
      {loading && <StandSpinner />}
      {!isMounting && !loading && !error && (
        <>
          <UserCover />
          <Outlet />
        </>
      )}
      {error && (
        <Error asModal={true} msg={message} onClose={handleResetError} />
      )}
    </>
  );
}

export default UserPage;
