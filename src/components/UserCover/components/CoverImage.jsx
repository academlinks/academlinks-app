import { useSelector } from "react-redux";
import { extractRootEndPointFromImg } from "lib";

import { useForeignUser } from "hooks/auth";
import { useUpdateUserCover } from "hooks/layoutBased";
import { selectUserCover } from "store/selectors/userSelectors";

import { Image, Spinner } from "components/Layouts";
import { CameraIcon } from "components/Layouts/Icons";
import UpdateUserCoverBTN from "./UpdateUserCoverBTN";
import styles from "./styles/coverImage.module.scss";

function CoverImage({ mediaHandler }) {
  const { coverImg } = useSelector(selectUserCover);

  const { isActiveUser } = useForeignUser("basedOnLocation");

  const {
    fileRef,
    file,
    setFile,
    saveChangeHandler,
    cancelChangeHandler,
    loading,
  } = useUpdateUserCover("coverImg");

  return (
    <>
      <div
        className={styles.cover}
        onClick={(e) => {
          e.stopPropagation();
          mediaHandler(0, [coverImg]);
        }}
      >
        {loading && <Spinner />}
        <Image
          src={
            file
              ? URL.createObjectURL(file)
              : extractRootEndPointFromImg(coverImg)
          }
          className={styles.coverImg}
        />
        {isActiveUser && !loading && (
          <label
            htmlFor="cover--img"
            className={styles.changeMediaBtn}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="file"
              id="cover--img"
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

export default CoverImage;
