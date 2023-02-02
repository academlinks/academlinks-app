import { nanoid } from "@reduxjs/toolkit";
import styles from "./styles/sideBar.module.scss";
import { extractRootEndPointFromImg } from "../../../../lib";

import { useSelector } from "react-redux";
import { selectCommercialsLeft } from "../../../../store/selectors/commercialSelectors";

function LeftBar() {
  const commercials = useSelector(selectCommercialsLeft);

  return (
    <aside className={`${styles.sideBar} ${styles.left}`}>
      {commercials.map((com) =>
        com.isLinkable ? (
          <figure key={nanoid()}>
            <a href={com.link} target="_blank" rel="noreferrer">
              <img
                src={extractRootEndPointFromImg(com.media)}
                alt={com.media}
              />
            </a>
          </figure>
        ) : (
          <figure key={nanoid()}>
            <img src={extractRootEndPointFromImg(com.media)} alt={com.media} />
          </figure>
        )
      )}
    </aside>
  );
}

export default LeftBar;
