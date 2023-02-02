/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useSelector } from "react-redux";

import {
  usePostQuery,
  useRestrictBodyOverflow,
  useCreatePost,
} from "../../hooks";
import { selectCreatePost } from "../../store/selectors/createPostSelectors";

import { fixLineBreaks, inverseLineBreaks } from "../../lib";

import { CreateBlogPostModal } from "../Layouts";

function UpdateBlogPostPortal() {
  const {
    updateBlogPostModalIsOpen,
    postData,
    createBlogPostError,
    loadingState: { loading, error, message },
  } = useSelector(selectCreatePost);

  const {
    handleCloseUpdateBlogPost,
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
        operationType: "update",
        type: "blogPost",
      },
      credentials: {
        title: postData.title,
        article: fixLineBreaks(postData.article),
        audience: postData.audience,
        media: [...postData.media, ...postData.files],
        tags: JSON.stringify(postData.tags.map((tag) => tag._id)),
        labels: JSON.stringify(postData.labels),
        category: postData.category,
        postId: postData._id,
      },
    });
  }

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    return () => restrictScroll(false);
  }, []);

  return (
    updateBlogPostModalIsOpen && (
      <CreateBlogPostModal
        // loading state
        loading={loading}
        error={error}
        message={message}
        // validation
        validationError={createBlogPostError}
        // activation
        isOpen={updateBlogPostModalIsOpen}
        setIsOpen={handleCloseUpdateBlogPost}
        // audience
        audience={postData.audience}
        handleAudience={audienceHandler}
        // title
        title={postData.title}
        handleTitle={handleTitle}
        // article
        text={inverseLineBreaks(postData.article)}
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
        files={[...postData.media, ...postData.files]}
        // publish
        publishPost={publishPost}
      />
    )
  );
}

export default UpdateBlogPostPortal;
