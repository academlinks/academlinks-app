import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { extractRootEndPointFromImg } from "lib";
import { useBlurOnBody } from "hooks/util";
import { useAuthenticationQuery } from "hooks/queries";
import { selectActiveUserShortInfo } from "store/selectors/activeUserSelectors";

import styles from "./styles/navAvatar.module.scss";

function NavAvatar() {
  const { image, _id, userName } = useSelector(selectActiveUserShortInfo);
  const [openAvatar, setOpenAvatar] = useState(false);

  const { logOutQuery } = useAuthenticationQuery();

  const onBlurHandler = () => setOpenAvatar(false);
  const onActiveAvatarHandler = () => setOpenAvatar((prev) => !prev);

  const { onFocus } = useBlurOnBody(onActiveAvatarHandler, onBlurHandler, [
    "user-avatar",
    "avatar-modal--list",
    "avatar--img",
  ]);

  return (
    <div className={styles.navAvatarBox}>
      <figure className={`${styles.avatar} user--avatar`} onClick={onFocus}>
        <img
          src={extractRootEndPointFromImg(image)}
          alt="user avatar"
          className="avatar--img"
        />
      </figure>

      {openAvatar && (
        <ul className={`${styles.navAvatarModal} avatar-modal--list`}>
          <li>
            <Link
              to={`/profile/${_id}/posts`}
              onClick={() => setOpenAvatar(false)}
            >
              {userName}
            </Link>
          </li>
          <li>
            <Link to={`/settings/${_id}`} onClick={() => setOpenAvatar(false)}>
              Settings
            </Link>
          </li>
          <li onClick={logOutQuery}>Log Out</li>
        </ul>
      )}
    </div>
  );
}

export default NavAvatar;
