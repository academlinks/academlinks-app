import { useSelector } from "react-redux";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../../../lib/cropImage";

import { extractRootEndPointFromImg } from "lib";
import { useForeignUser } from "hooks/auth";
import { useUpdateUserCover } from "hooks/layoutBased";
import { selectUserCover } from "store/selectors/userSelectors";

import { Image, Spinner } from "components/Layouts";
import { CameraIcon } from "components/Layouts/Icons";
import styles from "./styles/profileImage.module.scss";

function ProfileImage({ mediaHandler, setUpdateUserMedia }) {
  const { profileImg } = useSelector(selectUserCover);

  const { isActiveUser } = useForeignUser("basedOnLocation");

  const { fileRef, file, setFile, loading } = useUpdateUserCover(
    "profileImg",
    setUpdateUserMedia
  );

  return (
    <div
      className={styles.profile}
      onClick={(e) => {
        e.stopPropagation();
        mediaHandler(0, [profileImg]);
      }}
    >
      {loading && <Spinner />}
      <Image
        src={
          file
            ? URL.createObjectURL(file)
            : extractRootEndPointFromImg(profileImg)
        }
        className={styles.profileImg}
      />
      {isActiveUser && !loading && (
        <label
          htmlFor="profile--img"
          className={styles.changeMediaBtn}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="file"
            id="profile--img"
            ref={fileRef}
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
          <CameraIcon />
        </label>
      )}
    </div>
  );
}

export default ProfileImage;
