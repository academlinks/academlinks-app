import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSearchKey } from "../../store/reducers/friendsReducer";
import { useForeignUser, useScroll } from "../../hooks";
import { selectSearchKey } from "../../store/selectors/friendsSelector";

import styles from "./components/styles/friendsPageNavigation.module.scss";
import { SearchBar } from "../Layouts";

function Friends() {
  useScroll({ target: "elem", scrollTo: "friends__page--navigation-bar" });

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  function activeRoute(route) {
    if (pathname.includes(route)) return styles.active;
  }

  const { isActiveUser, profileId } = useForeignUser("basedOnId");

  const searchKey = useSelector(selectSearchKey);
  function handleSearch(e) {
    dispatch(setSearchKey(e.target.value));
  }

  return (
    <nav className={styles.friendsNav} id="friends__page--navigation-bar">
      <Link
        to={`/profile/${profileId}/friends/all-friends`}
        className={activeRoute("all-friends")}
      >
        all friends
      </Link>
      {isActiveUser && (
        <>
          <Link
            to={`/profile/${profileId}/friends/sent-requests`}
            className={activeRoute("sent-requests")}
          >
            sent request
          </Link>
          <Link
            to={`/profile/${profileId}/friends/pending-requests`}
            className={activeRoute("pending-request")}
          >
            pending request
          </Link>
        </>
      )}
      <SearchBar
        onChange={handleSearch}
        value={searchKey}
        className={styles.friendsSearch}
      />
    </nav>
  );
}

export default Friends;
