import { useScroll } from "../../hooks";
import styles from "./aboutContainer.module.scss";

function NewVersionContainer({ children }) {
  useScroll({
    target: "elem",
    scrollTo: "about__page--container",
    options: { block: "nearest" },
  });

  return (
    <div className={styles.newVersionContainer} id="about__page--container">
      {children}
    </div>
  );
}

export default NewVersionContainer;
