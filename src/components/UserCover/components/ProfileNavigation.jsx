import { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

import { useForeignUser } from "hooks/auth";

import { ArrowDownRectingle } from "components/Layouts/Icons";
import styles from "./styles/profileNavigation.module.scss";

function ProfileNavigation() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const location = pathname.split("/")[3];

  const [activeFold, setActiveFold] = useState(false);

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
        <button
          className={`${styles.navFoldBtn} ${
            activeFold ? styles.activeFoldBtn : ""
          }`}
          onClick={() => setActiveFold((prev) => !prev)}
        >
          <ArrowDownRectingle />
        </button>
        {isActiveUser && (
          <div
            className={`${styles.navigationFold} ${
              activeFold ? styles.activeFold : ""
            }`}
          >
            <div className={styles.navFoldList}>
              <li
                onClick={() => setActiveFold(false)}
                className={location === "bookmarks" ? styles.active : ""}
              >
                <Link to={`/profile/${id}/bookmarks`}>bookmarks</Link>
              </li>
              <li
                onClick={() => setActiveFold(false)}
                className={location === "profile-review" ? styles.active : ""}
              >
                <Link to={`/profile/${id}/profile-review/tags`}>
                  profile review
                </Link>
              </li>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default ProfileNavigation;
