/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useForeignUser, usePost } from "../../hooks";
import { useHelperQuery } from "../../hooks";

import styles from "./components/styles/userCover.module.scss";
import {
  CoverImage,
  ProfileImage,
  UsernameAndEmail,
  FriendShip,
  ProfileNavigation,
} from "./components";

function Profile() {
  const { isActiveUser, profileId } = useForeignUser("basedOnLocation");

  const [friendShip, setFriendShip] = useState(null);

  const { activatePostMediaHandler } = usePost();

  const { getFriendShipQuery } = useHelperQuery();

  useEffect(() => {
    async function getFriendshipInfo() {
      const data = await getFriendShipQuery(profileId);
      setFriendShip(data);
    }

    if (!isActiveUser) getFriendshipInfo();
  }, [isActiveUser, profileId]);

  return (
    <div className={styles.landscape}>
      <div className={styles.content}>
        <CoverImage mediaHandler={activatePostMediaHandler} />
        <ProfileImage mediaHandler={activatePostMediaHandler} />
        <UsernameAndEmail />
        {!isActiveUser && (
          <FriendShip
            friendShip={friendShip}
            profileId={profileId}
            setFriendShip={setFriendShip}
          />
        )}
        <ProfileNavigation />
      </div>
    </div>
  );
}

export default Profile;
