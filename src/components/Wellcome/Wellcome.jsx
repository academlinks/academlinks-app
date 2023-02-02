import { Link } from "react-router-dom";
import styles from "./wellcome.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";

function Wellcome(props) {
  return (
    <section className={styles.wellComeContainer}>
        <figure className={styles.logoFig}>
          <img src="/img/logo-big.webp" alt="academlinks logo" />
        </figure>
        <Link to="/authentication/register" className={styles.registerBtn}>
          Register Now
        </Link>
        <div className={styles.punchBox}>
          <span className={styles.userIcon}>
            <FaUserCircle />
          </span>
          <span className={styles.punch}>AcademLinks</span>
          <span className={styles.publicIcon}>
            <MdOutlinePublic />
          </span>
        </div>
        <blockquote className={styles.aboutText}>
          We connect scientists, academicians and researchers from all over the
          world to share the knowledge and create new one.
        </blockquote>
    </section>
  );
}

export default Wellcome;
