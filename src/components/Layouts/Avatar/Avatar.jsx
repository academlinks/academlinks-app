import { extractRootEndPointFromImg } from "lib";

import { Image } from "components/Layouts";
import styles from "./avatar.module.scss";

function Avatar({
  img = "/img/profile-default.webp",
  onClick = () => {},
  alt,
}) {
  return (
    <Image
      src={extractRootEndPointFromImg(img)}
      className={styles.avatar}
      onClick={onClick}
      alt={alt}
    />
  );
}

export default Avatar;
