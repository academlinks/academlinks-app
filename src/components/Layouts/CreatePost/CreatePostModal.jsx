import { useSelector } from "react-redux";

import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";

import styles from "./components/styles/createPostModal.module.scss";
import {
  Modal,
  UserIdentifier,
  PostAuthentic,
  DraftEditor,
  SelectAudience,
  BTN,
  InlineStandSpinner,
  Error,
} from "../";
import { CreatePostMedia, CreatePostTouch } from "./components";

function CreatePostModal({
  isOpen,
  setIsOpen,
  text,
  setText,
  files,
  handleDiscardMedia,
  handleAudience,
  audience,
  updateCredentials = {},
  handlePost,
  loading,
  error,
  message,
  validationError,
}) {
  const { userName, image, _id } = useSelector(selectActiveUserShortInfo);

  const {
    shared,
    type,
    authenticDescription,
    authenticAuthorImg,
    authenticAuthorName,
    authenticTags,
    createdAt,
    title,
    article,
    categories,
  } = updateCredentials;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={styles.createPostModal}
      modalClassName={styles.modalMain}
    >
      <div className={styles.createPostModalContentBox}>
        {loading && <InlineStandSpinner />}

        <UserIdentifier
          img={image}
          userName={userName}
          userId={_id}
          withTime={false}
          className={styles.createPostHeader}
        >
          <div className={styles.createPostAudience}>
            <SelectAudience
              handleAudience={handleAudience}
              audience={audience}
            />
          </div>
        </UserIdentifier>

        {(error || validationError.error) && (
          <Error
            msg={message || validationError.message}
            className={styles.creationError}
          />
        )}

        <div className={styles.content}>
          <DraftEditor
            text={text}
            setText={setText}
            className={styles.draftPost}
            placeholder="what's on your mind ?"
          />

          {!shared && (
            <CreatePostMedia
              files={files}
              handleDiscardMedia={handleDiscardMedia}
            />
          )}

          {shared && (
            <PostAuthentic
              shared={shared}
              type={type}
              proccessUpdate={true}
              referencedPost={true}
              data={{
                author: {
                  _id: "",
                  userName: authenticAuthorName,
                  profileImg: authenticAuthorImg,
                },
                createdAt: createdAt,
                description: authenticDescription,
                media: files,
                authenticTags,
                title,
                categories,
                article,
              }}
            />
          )}
        </div>

        <div className={styles.createPostFooterBox}>
          <CreatePostTouch withTextField={false} />
          <BTN
            onClick={handlePost}
            disabled={loading}
            className={styles.postBtn}
          >
            POST
          </BTN>
        </div>
      </div>
    </Modal>
  );
}

export default CreatePostModal;
