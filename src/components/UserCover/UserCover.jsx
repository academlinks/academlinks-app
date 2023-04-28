/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { usePost } from "hooks/layoutBased";
import { useForeignUser } from "hooks/auth";
import { useHelperQuery } from "hooks/queries";

import {
  CoverImage,
  ProfileImage,
  UsernameAndEmail,
  FriendShip,
  ProfileNavigation,
} from "./components";
import styles from "./components/styles/userCover.module.scss";

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
