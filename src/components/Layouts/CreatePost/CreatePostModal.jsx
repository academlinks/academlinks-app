import { useSelector } from "react-redux";

import { selectActiveUserShortInfo } from "store/selectors/activeUserSelectors";

import {
  Modal,
  UserIdentifier,
  PostAuthentic,
  DraftEditor,
  SelectAudience,
  BTN,
  InlineStandSpinner,
  Error,
} from "components/Layouts";
import { CreatePostMedia, CreatePostTouch } from "./components";
import styles from "./components/styles/createPostModal.module.scss";

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
      modalClassName={styles.createPostModal}
    >
      <div className={styles.modalContent}>
        {loading && <InlineStandSpinner />}

        <div className={styles.portalHeader}>
          <UserIdentifier
            img={image}
            userName={userName}
            userId={_id}
            withTime={false}
            className={styles.createPostHeader}
          >
            <div data-portal-audience>
              <SelectAudience
                handleAudience={handleAudience}
                audience={audience}
              />
            </div>
          </UserIdentifier>
        </div>

        {(error || validationError.error) && (
          <Error
            msg={message || validationError.message}
            className={styles.creationError}
          />
        )}

        <div className={styles.portalEditor}>
          <DraftEditor
            text={text}
            setText={setText}
            className={styles.draftPost}
            placeholder="what's on your mind ?"
          />
        </div>

        <div className={styles.portalContent}>
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

        <div className={styles.portalFooter}>
          <CreatePostTouch withTextField={false} />
          <BTN onClick={handlePost} disabled={loading}>
            POST
          </BTN>
        </div>
      </div>
    </Modal>
  );
}

export default CreatePostModal;
