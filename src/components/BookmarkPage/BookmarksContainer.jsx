import { useScroll } from "../../hooks";
import styles from "./styles/bookmarksContainer.module.scss";

function BookmarksContainer({ children }) {
  useScroll({
    target: "elem",
    scrollTo: "bookmark__page--container",
    options: { block: "start" },
  });

  return (
    <div className={`${styles.bookmarksConainer} bookmarks-page__container`} id="bookmark__page--container">
      {children}
    </div>
  );
}

export default BookmarksContainer;
