import { NavLink } from "react-router-dom";

import { useScroll } from "hooks/util";

import styles from "./components/styles/profileReviewNav.module.scss";

function ProfileReviewNav() {
  useScroll({ target: "elem", scrollTo: "profile-review__page--nav-bar" });

  return (
    <nav className={styles.profileReviewNav} id="profile-review__page--nav-bar">
      <NavLink
        to="tags"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        tagged posts
      </NavLink>
      <NavLink
        to="hidden"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        hidden posts
      </NavLink>
    </nav>
  );
}

export default ProfileReviewNav;
