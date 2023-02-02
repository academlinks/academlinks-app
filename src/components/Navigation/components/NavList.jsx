import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";
import styles from "./styles/navList.module.scss";

function NavList({ activeNav, onBlurHandler }) {
  const activeUserId = useSelector(selectActiveUserId);

  return (
    <ul
      className={`${styles.mainNavList} ${
        activeNav ? styles.activeNav : ""
      } nav--list`}
    >
      <li>
        <Link to="/feed" onClick={() => onBlurHandler()}>
          Feed
        </Link>
      </li>
      <li>
        <Link
          to={`/profile/${activeUserId}/posts`}
          onClick={() => onBlurHandler()}
        >
          Profile
        </Link>
      </li>
      <li>
        <Link to="/blog" onClick={() => onBlurHandler()}>
          Blog
        </Link>
      </li>
    </ul>
  );
}

export default NavList;
