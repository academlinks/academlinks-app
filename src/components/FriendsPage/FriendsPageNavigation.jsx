import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useScroll } from "hooks/util";
import { useForeignUser } from "hooks/auth";
import { setSearchKey } from "store/reducers/friendsReducer";
import { selectSearchKey } from "store/selectors/friendsSelector";

import styles from "./components/styles/friendsPageNavigation.module.scss";
import { SearchBar } from "components/Layouts";

function Friends() {
  useScroll({ target: "elem", scrollTo: "friends__page--navigation-bar" });

  const dispatch = useDispatch();

  const { isActiveUser, profileId } = useForeignUser("basedOnId");

  const searchKey = useSelector(selectSearchKey);
  function handleSearch(e) {
    dispatch(setSearchKey(e.target.value));
  }

  return (
    <nav className={styles.friendsNav} id="friends__page--navigation-bar">
      <NavLink
        to={`/profile/${profileId}/friends/all-friends`}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        all friends
      </NavLink>
      {isActiveUser && (
        <>
          <NavLink
            to={`/profile/${profileId}/friends/sent-requests`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            sent request
          </NavLink>
          <NavLink
            to={`/profile/${profileId}/friends/pending-requests`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            pending request
          </NavLink>
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
