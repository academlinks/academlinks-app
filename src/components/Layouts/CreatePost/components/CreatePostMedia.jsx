import { extractRootEndPointFromImg } from "lib";

import { Image } from "components/Layouts";
import { CloseXIcon, CloseIcon } from "components/Layouts/Icons";
import styles from "./styles/createPostMedia.module.scss";

function CreatePostMedia({ files, handleDiscardMedia }) {
  return (
    files[0] && (
      <div
        className={`${styles.postMediaBox} ${
          styles[
            `postMediaBox--${files?.length <= 5 ? files?.length : "extra"}`
          ]
        }`}
      >
        {Object.values(files)?.map((img, i) => (
          <div
            key={`${img?.name}-${img?.lastModified}--images for-update-${i}`}
            className={styles.imgBox}
          >
            <Image
              src={
                typeof img === "string"
                  ? extractRootEndPointFromImg(img)
                  : URL.createObjectURL(img)
              }
              className={styles.postMedia}
            />
            {i < 5 && (
              <button
                className={styles.discardMediaBtn}
                onClick={() => handleDiscardMedia(img)}
              >
                <CloseXIcon />
              </button>
            )}
          </div>
        ))}
        {files?.length > 5 && (
          <p className={styles.extraImagesLayOver}>+{files?.length - 5}</p>
        )}

        {files.length > 1 && (
          <button
            className={styles.discardAllMediaBtn}
            onClick={() => handleDiscardMedia("all")}
          >
            <CloseIcon />
            <span>discard all media</span>
          </button>
        )}
      </div>
    )
  );
}

export default CreatePostMedia;
