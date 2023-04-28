/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { usePostQuery } from "hooks/queries";
import { useCreatePost } from "hooks/layoutBased";
import { useRestrictBodyOverflow } from "hooks/util";
import { selectCreatePost } from "store/selectors/createPostSelectors";

import { CreateBlogPostModal } from "components/Layouts";

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
        article: postData.article,
        audience: postData.audience,
        media: [...postData.media, ...postData.files],
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
