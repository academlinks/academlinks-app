/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { usePostQuery } from "hooks/queries";
import { useCreatePost } from "hooks/layoutBased";
import { useRestrictBodyOverflow } from "hooks/util";
import { selectCreatePost } from "store/selectors/createPostSelectors";

import { CreatePostModal } from "components/Layouts";

function UpdatePostPortal() {
  const {
    updatePostModalIsOpen,
    postData,
    createPostError,
    loadingState: { loading, error, message },
  } = useSelector(selectCreatePost);

  const {
    handleCloseUpdatePostModal,
    handleDescription,
    discardMediaHandler,
    audienceHandler,
  } = useCreatePost({ key: "post", error: createPostError });

  const { publishPostQuery } = usePostQuery();

  function publishPost() {
    publishPostQuery({
      params: {
        operationType: "update",
        type: "post",
      },
      credentials: {
        audience: postData.audience,
        description: postData.description,
        media: [...postData.media, ...postData.files],
        postId: postData._id,
      },
    });
  }

  /*
   <CreatePostModal> uses <Modal> layout which one back in the hood uses this "useRestrictBodyOverflow" hook. <Modal> reactivates body overflow itself whenever it will be closed, but only if we click on the close button or on the backdrop. But here we are closing <CreatePostModal> e.i even <Modal> layout dinamicly whenever the post will finish creation, without pressing close button or backdrop and after this <Modal> itself can't reactivate body overflow itself anymore. Because of that we need to reactivate body overflow manually from there, again with help of useRestrictBodyOverflow hook. 
  */
  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    return () => restrictScroll(false);
  }, []);

  return (
    updatePostModalIsOpen && (
      <CreatePostModal
        loading={loading}
        error={error}
        message={message}
        validationError={createPostError}
        isOpen={updatePostModalIsOpen}
        setIsOpen={handleCloseUpdatePostModal}
        text={updatePostModalIsOpen ? postData.description : ""}
        setText={handleDescription}
        handleAudience={audienceHandler}
        audience={postData.audience}
        files={[...postData.media, ...postData.files]}
        handleDiscardMedia={discardMediaHandler}
        updateCredentials={postData}
        handlePost={publishPost}
      />
    )
  );
}

export default UpdatePostPortal;
