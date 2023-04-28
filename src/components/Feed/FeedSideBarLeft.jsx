import { memo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { extractRootEndPointFromImg } from "lib";
import { selectCommercialsLeft } from "store/selectors/commercialSelectors";

import styles from "./styles/feedSideBar.module.scss";

const FeedSideBarLeft = memo(() => {
  const commercials = useSelector(selectCommercialsLeft);

  return (
    <aside className={`${styles.feedSideBar} ${styles.left}`}>
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

export default FeedSideBarLeft;
