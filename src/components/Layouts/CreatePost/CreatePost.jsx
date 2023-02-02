/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo } from "react";
import { useSelector } from "react-redux";

import {
  usePostQuery,
  useRestrictBodyOverflow,
  useCreatePost,
} from "../../../hooks";
import { fixLineBreaks } from "../../../lib";
import { selectCreatePost } from "../../../store/selectors/createPostSelectors";

import styles from "./components/styles/createPost.module.scss";
import { CreatePostTouch } from "./components";
import CreatePostModal from "./CreatePostModal";

const CreatePost = memo(({ className }) => {
  const {
    createPostIsOpen,
    postData,
    createPostError,
    loadingState: { loading, error, message },
  } = useSelector(selectCreatePost);

  const {
    openCreatePostModal,
    handleDescription,
    addTagHandler,
    removeTagHandler,
    discardMediaHandler,
    audienceHandler,
  } = useCreatePost({ key: "post", error: createPostError });

  /*
   <CreatePostModal> uses <Modal> layout which one back in the hood uses this "useRestrictBodyOverflow" hook. <Modal> reactivates body overflow itself whenever it will be closed, but only if we click on the close button or on the backdrop. But here we are closing <CreatePostModal> e.i even <Modal> layout dinamicly whenever the post will finish creation, without pressing close button or backdrop and after this <Modal> itself can't reactivate body overflow itself anymore. Because of that we need to reactivate body overflow manually from there, again with help of useRestrictBodyOverflow hook. 
  */
  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    if (!createPostIsOpen) restrictScroll(false);
  }, [createPostIsOpen, restrictScroll]);

  const { publishPostQuery } = usePostQuery();

  function publishPost() {
    publishPostQuery({
      params: {
        operationType: "publish",
        type: "post",
      },
      credentials: {
        audience: postData.audience,
        description: fixLineBreaks(postData.description),
        media: postData.files,
        tags: JSON.stringify(postData.tags.map((tag) => tag._id)),
      },
    });
  }

  return (
    <div className={`${styles.createPost} ${className || ""}`}>
      <CreatePostTouch setIsOpen={openCreatePostModal} />
      {createPostIsOpen && (
        <CreatePostModal
          loading={loading}
          error={error}
          message={message}
          validationError={createPostError}
          isOpen={createPostIsOpen}
          setIsOpen={openCreatePostModal}
          text={postData.description}
          setText={handleDescription}
          tags={postData.tags}
          handleTag={addTagHandler}
          audience={postData.audience}
          handleAudience={audienceHandler}
          handleRemoveTag={removeTagHandler}
          files={postData.files}
          handleDiscardMedia={discardMediaHandler}
          handlePost={publishPost}
        />
      )}
    </div>
  );
});

export default CreatePost;
