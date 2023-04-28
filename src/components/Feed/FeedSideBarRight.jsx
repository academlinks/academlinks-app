import { memo } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { extractRootEndPointFromImg } from "lib";
import { selectCommercialsRight } from "store/selectors/commercialSelectors";

import styles from "./styles/feedSideBar.module.scss";

const SideBarRight = memo(() => {
  const commercials = useSelector(selectCommercialsRight);

  return (
    <aside className={`${styles.feedSideBar} ${styles.right}`}>
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
});

export default SideBarRight;
