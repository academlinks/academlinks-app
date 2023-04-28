// import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../../../lib/cropImage";

import { extractRootEndPointFromImg } from "lib";
import { useForeignUser } from "hooks/auth";
import { useUpdateUserCover } from "hooks/layoutBased";
import { selectUserCover } from "store/selectors/userSelectors";

import { Image, Spinner } from "components/Layouts";
import { CameraIcon } from "components/Layouts/Icons";
import UpdateUserCoverBTN from "./UpdateUserCoverBTN";
import styles from "./styles/profileImage.module.scss";

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

  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  // const [cropedAreaPixels, setCropedAreaPixels] = useState(null);

  // const onCropComplete = (croppedArea, croppedAreaPixels) => {
  //   console.log(croppedArea, croppedAreaPixels);
  //   setCropedAreaPixels(croppedAreaPixels);
  // };

  // const cropImage = async () => {
  //   try {
  //     const res = await getCroppedImg(file, cropedAreaPixels);
  //     console.log(res);
  //   } catch (error) {}
  // };

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

      {/* {file && (
        <div className={styles.cropModal}>
          <div className={styles.cropWindow}>
            <div className={styles.cropWrapper}>
              <Cropper
                image={URL.createObjectURL(file)}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onZoomChange={setZoom}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                cropShape="round"
                zoomWithScroll={true}
                objectFit="contain"
                classes={{
                  containerClassName: styles.cropContainer,
                  mediaClassName: styles.cropMedia,
                  cropAreaClassName: styles.cropArea,
                }}
              />
            </div>
            <div className={styles.cropControllerBox}>
              <span>zoom {zoom}x/5x</span>
              <input
                type="range"
                min="1"
                max="5"
                value={zoom}
                step={1}
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
              />
            </div>
            <div className={styles.saveActions}>
              <button onClick={cropImage}>crop</button>
              <UpdateUserCoverBTN
                cancelHandler={cancelChangeHandler}
                submitHandler={saveChangeHandler}
              />
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default ProfileImage;
