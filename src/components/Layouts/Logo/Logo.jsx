import { Link } from "react-router-dom";
import styles from "./logo.module.scss";

function Logo({ className }) {
  return (
    <Link to="/feed" className={`${styles.logo} ${className || ""}`}>
      <figure>
        <img src="/img/logo-white.webp" alt="" />
      </figure>
    </Link>
  );
}

export default Logo;
