import { useSelector } from "react-redux";
import { extractRootEndPointFromImg } from "../../../lib";

import { useUpdateUserCover, useForeignUser } from "../../../hooks";
import { selectUserCover } from "../../../store/selectors/userSelectors";

import styles from "./styles/coverImage.module.scss";
import { Image, Spinner } from "../../Layouts";
import { CameraIcon } from "../../Layouts/Icons/icons";
import UpdateUserCoverBTN from "./UpdateUserCoverBTN";

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
