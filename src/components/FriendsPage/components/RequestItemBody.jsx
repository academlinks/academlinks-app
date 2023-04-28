import { Link } from "react-router-dom";

import { extractRootEndPointFromImg } from "lib";

import { Image } from "components/Layouts";
import styles from "./styles/request.module.scss";

function RequestItemBody({ children, img, userName, userId, muntuals }) {
  return (
    <div className={styles.requestItem}>
      <Image
        src={extractRootEndPointFromImg(img)}
        className={styles.friendImg}
      />
      <Link to={`/profile/${userId}/posts`} className={styles.friendName}>
        {userName}
      </Link>
      <span className={styles.muntuals}>{muntuals} muntual friends</span>
      {children}
    </div>
  );
}

export default RequestItemBody;
