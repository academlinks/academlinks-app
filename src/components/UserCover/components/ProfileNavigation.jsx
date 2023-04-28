import { useLocation, useParams, Link } from "react-router-dom";

import { useForeignUser } from "hooks/auth";

import styles from "./styles/profileNavigation.module.scss";

function ProfileNavigation() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const location = pathname.split("/")[3];

  const { isActiveUser } = useForeignUser("basedOnId");

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={location === "posts" ? styles.active : ""}>
          <Link to={`/profile/${id}/posts`}>posts</Link>
        </li>
        <li className={location === "about" ? styles.active : ""}>
          <Link to={`/profile/${id}/about`}>about</Link>
        </li>
        <li className={location === "friends" ? styles.active : ""}>
          <Link to={`/profile/${id}/friends/all-friends`}>friends</Link>
        </li>
        <li>
          <Link to={`/blog`} state={{ author: id }}>
            blog
          </Link>
        </li>
        {isActiveUser && (
          <>
            <li className={location === "bookmarks" ? styles.active : ""}>
              <Link to={`/profile/${id}/bookmarks`}>bookmarks</Link>
            </li>
            <li className={location === "profile-review" ? styles.active : ""}>
              <Link to={`/profile/${id}/profile-review/tags`}>
                profile review
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default ProfileNavigation;
