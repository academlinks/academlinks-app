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
  UpdateUserCoverBTN,
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

  const [updateUserMedia, setUpdateUserMedia] = useState({
    isProccessing: false,
    saveChangeHandler: () => {},
    cancelChangeHandler: () => {},
  });

  return (
    <div className={styles.landscape}>
      <CoverImage
        mediaHandler={activatePostMediaHandler}
        setUpdateUserMedia={setUpdateUserMedia}
      />
      <div className={styles.content}>
        <div className={styles.userBase}>
          <ProfileImage
            mediaHandler={activatePostMediaHandler}
            setUpdateUserMedia={setUpdateUserMedia}
          />

          <UsernameAndEmail />

          {updateUserMedia.isProccessing && (
            <UpdateUserCoverBTN
              cancelHandler={updateUserMedia.cancelChangeHandler}
              submitHandler={updateUserMedia.saveChangeHandler}
            />
          )}

          {!isActiveUser && (
            <FriendShip
              friendShip={friendShip}
              profileId={profileId}
              setFriendShip={setFriendShip}
            />
          )}
        </div>
        <ProfileNavigation />
      </div>
    </div>
  );
}

export default Profile;
