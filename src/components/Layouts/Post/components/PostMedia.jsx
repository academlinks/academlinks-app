import { extractRootEndPointFromImg } from "../../../../lib";

import { Image } from "../../../Layouts";
import styles from "./styles/postMedia.module.scss";

function PostMedia({ activateMedia, media, className }) {
  return (
    <div
      className={`${styles.postMediaBox} ${
        styles[`postMediaBox--${media?.length > 5 ? "multi" : media?.length}`]
      }`}
    >
      {media.map((media, i, mediaArr) => (
        <Image
          onClick={() => activateMedia(i, mediaArr)}
          src={extractRootEndPointFromImg(media)}
          loading="lazy"
          className={`${styles.postMedia} ${className || ""}`}
          key={media}
        />
      ))}
      {media.length > 5 && (
        <span
          className={styles.multiLayOver}
          onClick={() => activateMedia(5, media)}
        >
          +{media.length - 5}
        </span>
      )}
    </div>
  );
}

export default PostMedia;
