import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  usePostQuery,
  useCreatePost,
  useRestrictBodyOverflow,
} from "../../../hooks";
import { selectCreatePost } from "../../../store/selectors/createPostSelectors";
import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";

import { fixLineBreaks } from "../../../lib";

import styles from "./components/styles/createBlogPostTouch.module.scss";
import CreateBlogPostModal from "./CreateBlogPostModal";
import { MultiMediaIcon } from "../Icons/icons";
import { UserIdentifier } from "../";

function CreateBlogPostTouch({ className }) {
  const { userName, image } = useSelector(selectActiveUserShortInfo);

  const {
    createBlogPostIsOpen,
    postData,
    createBlogPostError,
    loadingState: { loading, error, message },
  } = useSelector(selectCreatePost);

  const {
    activateCreateBlogPost,
    audienceHandler,
    handleTitle,
    handleArticle,
    label,
    setLabel,
    handleAddLabel,
    handleRemoveLabel,
    handleCategory,
    addTagHandler,
    removeTagHandler,
    addMediaHandler,
    discardMediaHandler,
  } = useCreatePost({
    key: "blogPost",
    error: createBlogPostError,
  });

  const { publishPostQuery } = usePostQuery();

  function publishPost() {
    publishPostQuery({
      params: {
        type: "blogPost",
        operationType: "publish",
      },
      credentials: {
        audience: postData.audience,
        title: postData.title,
        article: fixLineBreaks(postData.article),
        media: postData.files,
        tags: JSON.stringify(postData.tags.map((tag) => tag._id)),
        labels: JSON.stringify(postData.labels),
        category: postData.category,
      },
    });
  }

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    if (!createBlogPostIsOpen) restrictScroll(false);
  }, [createBlogPostIsOpen, restrictScroll]);

  return (
    <>
      <div
        onClick={() => activateCreateBlogPost(true)}
        className={`${styles.createBlogPostTouch} ${className || ""}`}
      >
        <UserIdentifier userName={userName} img={image} withTime={false} />
        <input type="text" placeholder="article..." />
        <label
          htmlFor="blogPostMedia"
          className={styles.mediaLabel}
          onClick={() => activateCreateBlogPost(true)}
        >
          <MultiMediaIcon />
          Media
        </label>
      </div>

      {createBlogPostIsOpen && (
        <CreateBlogPostModal
          // loading state
          loading={loading}
          error={error}
          message={message}
          // validation
          validationError={createBlogPostError}
          // activation
          isOpen={createBlogPostIsOpen}
          setIsOpen={() => activateCreateBlogPost(false)}
          // audience
          audience={postData.audience}
          handleAudience={audienceHandler}
          // title
          title={postData.title}
          handleTitle={handleTitle}
          // article
          text={postData.article}
          handleText={handleArticle}
          // labels
          label={label}
          setLabel={setLabel}
          labels={postData.labels}
          handleAddLabel={handleAddLabel}
          handleRemoveLabel={handleRemoveLabel}
          // category
          category={postData.category}
          handleCategory={handleCategory}
          // tags
          tags={postData.tags}
          handleAddTag={addTagHandler}
          handleRemoveTag={removeTagHandler}
          // media files
          handleMediaFiles={(e) => addMediaHandler(e.target.files)}
          handleRemoveMediaFile={discardMediaHandler}
          files={postData.files}
          // publish
          publishPost={publishPost}
        />
      )}
    </>
  );
}

export default CreateBlogPostTouch;
