/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useForeignUser, useFriendsQuery, useScroll } from "../../hooks";
import { selectAllFriendsPageState } from "../../store/selectors/friendsSelector";

import styles from "./components/styles/allFriends.module.scss";
import FriendOptions from "./components/FriendOptions";
import { Image, Error, EmptyContentMessage } from "../Layouts";

function AllFriends() {
  const { isActiveUser } = useForeignUser("basedOnLocation");

  const { deleteFriendQuery, handleResetRequestError } = useFriendsQuery();

  const {
    allFriends,
    searchKey,
    requestError: { error, task, message },
  } = useSelector(selectAllFriendsPageState);

  useScroll({ target: "elem", scrollTo: "nested-all--friends__page" });

  return (
    <div className={styles.allFriends} id="nested-all--friends__page">
      {allFriends[0] &&
        allFriends
          .filter((friend) => {
            if (!searchKey) return friend;
            else return friend.userName.includes(searchKey);
          })
          .map((friend) => (
            <div className={styles.friend} key={friend._id}>
              <Image src={friend.profileImg} className={styles.friendImg} />
              <Link
                to={`/profile/${friend._id}/posts`}
                className={styles.friendName}
              >
                {friend.userName}
              </Link>
              <span className={styles.muntuals}>
                {friend.muntual} muntual friends
              </span>
              {isActiveUser && (
                <FriendOptions
                  deleteFriendHandler={() => deleteFriendQuery(friend._id)}
                />
              )}
            </div>
          ))}
      {error && ["remove"].includes(task) && (
        <Error msg={message} asModal={true} onClose={handleResetRequestError} />
      )}
      {!allFriends[0] && !error && (
        <EmptyContentMessage
          message="you don't have friends yet"
          className={styles.emptyFriendsMessage}
        />
      )}
    </div>
  );
}

export default AllFriends;
