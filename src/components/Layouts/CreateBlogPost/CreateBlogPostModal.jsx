import { useSelector } from "react-redux";

import { VALID_BLOG_POST_CATEGORIES } from "lib/config";
import { selectActiveUserShortInfo } from "store/selectors/activeUserSelectors";

import {
  UserIdentifier,
  DraftEditor,
  SelectAudience,
  Modal,
  BTN,
  InlineStandSpinner,
  Error,
  Select,
  Input,
} from "components/Layouts";
import styles from "./components/styles/createBlogPostModal.module.scss";
import { Labels, CreateBlogPostMedia } from "./components";

function CreateBlogPost({
  //loading state
  loading,
  error,
  message,
  // validation
  validationError,
  //activation
  isOpen,
  setIsOpen,
  // audience
  audience,
  handleAudience,
  // title
  title,
  handleTitle,
  // article
  text,
  handleText,
  // labels
  label,
  setLabel,
  labels,
  handleAddLabel,
  handleRemoveLabel,
  // category
  category,
  handleCategory,
  // media files
  files,
  handleMediaFiles,
  handleRemoveMediaFile,
  // publish
  publishPost,
}) {
  const { userName, image } = useSelector(selectActiveUserShortInfo);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalClassName={styles.createBlogPostModal}
      className={styles.createBlogPostModalWindow}
    >
      <main className={styles.createBlogPostContent}>
        {loading && <InlineStandSpinner />}

        <header className={styles.createBlogPostHeader}>
          <UserIdentifier userName={userName} img={image} withTime={false}>
            <div data-portal-audience>
              <SelectAudience
                audience={audience}
                handleAudience={handleAudience}
                isBlogPostAudience={true}
              />
            </div>
          </UserIdentifier>
        </header>

        {error && <Error msg={message} />}

        <div className={styles.createBlogPostForm}>
          <Input
            label="title"
            placeholder="title"
            value={title}
            onChange={handleTitle}
            id="title"
            name="title"
            error={validationError.title.hasError}
            message={validationError.title.message}
            type="text"
            labelTitle={"is required and must contain min 2 letter"}
            className={styles.titleField}
          />

          <Labels
            addLaebel={handleAddLabel}
            removeLabel={handleRemoveLabel}
            label={label}
            setLabel={setLabel}
            labels={labels}
            error={validationError.labels}
          />

          <Select
            label="category"
            error={validationError.category.hasError}
            message={validationError.category.message}
            handler={handleCategory}
            data={{
              values: VALID_BLOG_POST_CATEGORIES,
              default: {
                label: category || "category",
                value: category || "category",
              },
            }}
          />
        </div>

        <div className={styles.createBlogPostEditor}>
          <div className={styles.articleFieldHead}>
            <label>Article</label>
            {validationError.article.hasError && (
              <p className={styles.articleError}>
                {validationError.article.message}
              </p>
            )}
          </div>

          <DraftEditor setText={handleText} placeholder="article" text={text} />
        </div>

        <div className={styles.createBlogPostAssets}>
          <CreateBlogPostMedia
            handleMediaFiles={handleMediaFiles}
            files={files}
            handleRemoveMediaFile={handleRemoveMediaFile}
          />
        </div>

        <footer className={styles.createBlogPostFooter}>
          <BTN className={styles.publishBlogPostBtn} onClick={publishPost}>
            POST
          </BTN>
        </footer>
      </main>
    </Modal>
  );
}

export default CreateBlogPost;
