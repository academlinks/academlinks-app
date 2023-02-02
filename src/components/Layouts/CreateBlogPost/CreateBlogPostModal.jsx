import { useSelector } from "react-redux";

import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";

import {
  UserIdentifier,
  TextAreaWithTag,
  SelectAudience,
  Modal,
  BTN,
  InlineStandSpinner,
  Error,
  Select,
} from "../";
import styles from "./components/styles/createBlogPostModal.module.scss";
import { Labels, CreateBlogPostMedia } from "./components";
import { Input } from "../../Layouts";

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
  // tags
  tags,
  handleAddTag,
  handleRemoveTag,
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
      className={styles.createBlogPostModal}
    >
      <div className={styles.fields}>
        {loading && <InlineStandSpinner />}

        <UserIdentifier
          userName={userName}
          img={image}
          withTime={false}
          className={styles.blogPostIdentifier}
        >
          <div className={styles.blogPostAudience}>
            <SelectAudience
              audience={audience}
              handleAudience={handleAudience}
              isBlogPostAudience={true}
            />
          </div>
        </UserIdentifier>

        {error && <Error msg={message} />}

        <div className={styles.titleAndCategoryBox}>
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
              default: {
                label: category || "category",
                value: category || "category",
              },
              values: [
                "economics",
                "business",
                "law",
                "medicine",
                "psychology",
                "philosophy",
                "politics",
                "natural sciences",
                "exact sciences",
                "other",
              ],
            }}
          />
        </div>

        <div className={styles.articleField}>
          <div className={styles.articleFieldHead}>
            <label>Article</label>
            {validationError.article.hasError && (
              <p className={styles.articleError}>
                {validationError.article.message}
              </p>
            )}
          </div>
          
          <TextAreaWithTag
            submitHandler={publishPost}
            text={text}
            setText={handleText}
            tags={tags}
            setTag={handleAddTag}
            removeTag={handleRemoveTag}
            className={styles.blogPostTextField}
            placeholder="article"
            maxRows={8}
          />
        </div>

        <CreateBlogPostMedia
          handleMediaFiles={handleMediaFiles}
          files={files}
          handleRemoveMediaFile={handleRemoveMediaFile}
        />

        <div className={styles.publishBtnBox}>
          <BTN className={styles.publishBlogPostBtn} onClick={publishPost}>
            POST
          </BTN>
        </div>
      </div>
    </Modal>
  );
}

export default CreateBlogPost;
