import { nanoid } from "@reduxjs/toolkit";
import styles from "./styles/sideBar.module.scss";
import { extractRootEndPointFromImg } from "../../../../lib";

import { useSelector } from "react-redux";
import { selectCommercialsRight } from "../../../../store/selectors/commercialSelectors";

function RightBar() {
  const commercials = useSelector(selectCommercialsRight);

  return (
    <aside className={`${styles.sideBar} ${styles.right}`}>
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

export default RightBar;
