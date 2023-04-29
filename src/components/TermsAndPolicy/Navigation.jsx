import { NavLink } from "react-router-dom";
import styles from "./styles/navigation.module.scss";

function Navigation(props) {
  return (
    <nav className={styles.termsAndPolicyNav}>
      <ul className={styles.termsAndPolicyNavList}>
        {["terms", "policy"].map((route) => (
          <li>
            <NavLink
              to={route}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
              key={route}
            >
              {route}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
