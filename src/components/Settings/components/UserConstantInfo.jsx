import { useSelector } from "react-redux";

import { formatDate } from "lib";
import { selectActiveUser } from "store/selectors/activeUserSelectors";

import { Avatar } from "components/Layouts";
import styles from "./styles/userConstantInfo.module.scss";

function UserConstantInfo() {
  const user = useSelector(selectActiveUser);

  return (
    <div className={styles.userInfo}>
      <Avatar img={user.profileImg} />
      <div className={styles.infoFragmentsList}>
        <p className={styles.userInfoFragment}>
          <span>user name -</span>
          <span className={styles.infoUserName}>{user.userName}</span>
        </p>
        <p className={styles.userInfoFragment}>
          <span>email -</span>
          <span>{user.email}</span>
        </p>
        <p className={styles.userInfoFragment}>
          <span>registered -</span>
          <span>{formatDate(user.createdAt, "verbal")}</span>
        </p>
      </div>
    </div>
  );
}

export default UserConstantInfo;
