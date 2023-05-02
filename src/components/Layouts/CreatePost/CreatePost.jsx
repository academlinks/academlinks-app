/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo, useRef } from "react";
import { useSelector } from "react-redux";

import { usePostQuery } from "hooks/queries";
import { useCreatePost } from "hooks/layoutBased";
import { useRestrictBodyOverflow } from "hooks/util";
import { selectCreatePost } from "store/selectors/createPostSelectors";

import { CreatePostTouch } from "./components";
import CreatePostModal from "./CreatePostModal";
import styles from "./components/styles/createPost.module.scss";

const CreatePost = memo(({ className }) => {
  const {
    createPostIsOpen,
    updatePostModalIsOpen,
    postData,
    createPostError,
    loadingState: { loading, error, message },
  } = useSelector(selectCreatePost);

  const {
    openCreatePostModal,
    handleDescription,
    discardMediaHandler,
    audienceHandler,
  } = useCreatePost({ key: "post", error: createPostError });

  const filesRef = useRef();

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
        description: postData.description,
        media: postData.files,
        tags: JSON.stringify(postData.tags.map((tag) => tag._id)),
      },
    });
  }

  return (
    <div className={`${styles.createPost} ${className || ""}`}>
      <CreatePostTouch
        setIsOpen={!updatePostModalIsOpen ? openCreatePostModal : null}
        isOpen={createPostIsOpen}
        filesRef={filesRef}
      />
      {createPostIsOpen && (
        <CreatePostModal
          loading={loading}
          error={error}
          message={message}
          validationError={createPostError}
          isOpen={createPostIsOpen}
          setIsOpen={(val) => {
            filesRef.current.value = null;
            openCreatePostModal(val);
          }}
          text={createPostIsOpen ? postData.description : ""}
          setText={handleDescription}
          audience={postData.audience}
          handleAudience={audienceHandler}
          files={postData.files}
          handleDiscardMedia={(img) => {
            filesRef.current.value = null;
            discardMediaHandler(img);
          }}
          handlePost={publishPost}
        />
      )}
    </div>
  );
});

export default CreatePost;
