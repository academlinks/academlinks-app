import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { extractRootEndPointFromImg } from "lib";
import { selectUserInfo } from "store/selectors/userSelectors";

import { Image } from "components/Layouts";
import styles from "./styles/postsPageUserFriends.module.scss";

function PostsPageUserFriends() {
  const { friends, friendsAmount, _id } = useSelector(selectUserInfo);

  return (
    <div className={styles.postsPageUserFriends}>
      <div className={styles.userFriendsIntro}>
        <p className={styles.introTitle}>friends</p>

        <Link
          to={`/profile/${_id}/friends/all-friends`}
          className={styles.showAll}
        >
          show all friends
        </Link>

        <p className={styles.introAmount}>{friendsAmount} friends</p>
      </div>

      <div className={styles.friendsList}>
        {friends?.map((friend) => (
          <div className={styles.friend} key={friend._id}>
            <Image
              src={extractRootEndPointFromImg(friend.profileImg)}
              className={styles.friendImg}
            />

            <Link to={`/profile/${friend._id}/posts`}>
              <h4 className={styles.friendName} title={friend.userName}>
                {friend.userName?.length > 14
                  ? friend.userName.split(" ")[0].concat("...")
                  : friend.userName}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsPageUserFriends;
