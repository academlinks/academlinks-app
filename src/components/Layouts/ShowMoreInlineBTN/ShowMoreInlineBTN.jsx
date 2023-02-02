import { Link } from "react-router-dom";
import styles from "./showMoreInlineBTN.module.scss";

function ShowMoreInlineBTN({ path, query, asLink = false, handler }) {
  return asLink ? (
    <Link
      to={{
        pathname: path,
        query: query,
      }}
      target="_blank"
      className={styles.inlineBtnLink}
    >
      <button className={styles.showMoreBtn}>show more</button>
    </Link>
  ) : (
    <button
      className={`${styles.showMoreBtn} ${styles.showMoreBtnTransparent}`}
      onClick={handler}
    >
      show more
    </button>
  );
}

export default ShowMoreInlineBTN;
