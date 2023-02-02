import { useSelector } from "react-redux";
import { useUpdateUserCover, useForeignUser } from "../../../hooks";
import { extractRootEndPointFromImg } from "../../../lib";

import { selectUserCover } from "../../../store/selectors/userSelectors";

import styles from "./styles/profileImage.module.scss";
import { Image, Spinner } from "../../Layouts";
import { CameraIcon } from "../../Layouts/Icons/icons";
import UpdateUserCoverBTN from "./UpdateUserCoverBTN";

function ProfileImage({ mediaHandler }) {
  const { profileImg } = useSelector(selectUserCover);

  const { isActiveUser } = useForeignUser("basedOnLocation");

  const {
    fileRef,
    file,
    setFile,
    saveChangeHandler,
    cancelChangeHandler,
    loading,
  } = useUpdateUserCover("profileImg");

  return (
    <>
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
      {file && (
        <UpdateUserCoverBTN
          cancelHandler={cancelChangeHandler}
          submitHandler={saveChangeHandler}
        />
      )}
    </>
  );
}

export default ProfileImage;
