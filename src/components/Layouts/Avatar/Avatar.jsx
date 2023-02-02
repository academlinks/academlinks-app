import styles from "./avatar.module.scss";
import { Image } from "../../Layouts";
import { extractRootEndPointFromImg } from "../../../lib";

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
