import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectIsAuthenticated } from "store/selectors/activeUserSelectors";
import styles from "./logo.module.scss";

function Logo({ className }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Link
      to={isAuthenticated ? "/feed" : "/"}
      className={`${styles.logo} ${className || ""}`}
    >
      <figure>
        <img src="/img/logo-white.webp" alt="" />
      </figure>
    </Link>
  );
}

export default Logo;
