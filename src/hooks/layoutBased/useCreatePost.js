import { useDispatch } from "react-redux";
import { useState } from "react";

import {
  //////////////////////////////
  /// Open And Close Modals ///
  ////////////////////////////
  setCreatePostIsOpen,
  setUpdatePostModalOpen,
  setUpdatePostModalClose,
  setCreateBlogPostIsOpen,
  setUpdateBlogPostData,
  setUpdateBlogPostModalClose,
  /////////////
  /// Crud ///
  ///////////
  // crossOver CRUD
  setAudience,
  addTag,
  removeTag,
  setFile,
  removeFiles,
  // blog post CRUD
  setArticle,
  setTitle,
  addLabel,
  removeLabel,
  setCategory,
  // post CRUD
  setDescription,
  // errro handler helper
  resetCreateBlogPostValidationErrorFragment,
  resetCreatePostValidationError,
} from "../../store/reducers/createPostReducer";

export default function useCreatePost({ key, error }) {
  const dispatch = useDispatch();

  //////////////////////////////
  /// Open And Close Modals ///
  ////////////////////////////

  function openCreatePostModal(open) {
    dispatch(setCreatePostIsOpen(open));
  }

  function handleUpdatePostModalOpen(data) {
    dispatch(setUpdatePostModalOpen(data));
  }

  function handleCloseUpdatePostModal() {
    dispatch(setUpdatePostModalClose());
  }

  function activateCreateBlogPost(open) {
    dispatch(setCreateBlogPostIsOpen(open));
  }

  function handleUpdateBlogPostData(data) {
    dispatch(setUpdateBlogPostData(data));
  }

  function handleCloseUpdateBlogPost(open) {
    dispatch(setUpdateBlogPostModalClose(open));
  }

  /////////////
  /// Crud ///
  ///////////

  // crossOver CRUD

  function audienceHandler(audience) {
    dispatch(setAudience(audience));
  }

  function addTagHandler(tag) {
    dispatch(addTag(tag));
    if (key === "post" && error.error)
      dispatch(resetCreatePostValidationError());
  }

  function removeTagHandler(id) {
    dispatch(removeTag(id));
  }

  function addMediaHandler(files) {
    dispatch(setFile(files));

    if (key === "post" && error?.error)
      dispatch(resetCreatePostValidationError());
  }

  function discardMediaHandler(url) {
    dispatch(removeFiles(url));
  }

  // post CRUD
  function handleDescription(text) {
    dispatch(setDescription(text));
    if (key === "post" && error.error)
      dispatch(resetCreatePostValidationError());
  }

  // blog post CRUD

  const handleTitle = (e) => {
    dispatch(setTitle(e.target.value));
    if (key === "blogPost" && error.title && error.title.hasError)
      dispatch(resetCreateBlogPostValidationErrorFragment({ target: "title" }));
  };

  const [label, setLabel] = useState("");

  function handleAddLabel(e) {
    e.preventDefault();
    if (
      label.startsWith("#") &&
      label.split("#")[1] &&
      label.split("#")[1].length > 2
    ) {
      dispatch(addLabel(label.replace("#", "")));
      setLabel("");
      if (key === "blogPost" && error.labels && error.labels.hasError)
        dispatch(
          resetCreateBlogPostValidationErrorFragment({ target: "labels" })
        );
    }
  }

  function handleCategory(category) {
    dispatch(setCategory(category));
    if (key === "blogPost" && error.category && error.category.hasError)
      dispatch(
        resetCreateBlogPostValidationErrorFragment({ target: "category" })
      );
  }

  const handleRemoveLabel = (category) => dispatch(removeLabel(category));

  function handleArticle(text) {
    dispatch(setArticle(text));
    if (key === "blogPost" && error.article && error.article.hasError)
      dispatch(
        resetCreateBlogPostValidationErrorFragment({ target: "article" })
      );
  }

  return {
    //////////////////////////////
    /// Open And Close Modals ///
    ////////////////////////////
    openCreatePostModal,
    handleUpdatePostModalOpen,
    handleCloseUpdatePostModal,
    activateCreateBlogPost,
    handleUpdateBlogPostData,
    handleCloseUpdateBlogPost,
    /////////////
    /// Crud ///
    ///////////
    // crossOver CRUD
    audienceHandler,
    addTagHandler,
    removeTagHandler,
    addMediaHandler,
    discardMediaHandler,
    // post CRUD
    handleDescription,
    // blog post CRUD
    handleTitle,
    label,
    setLabel,
    handleAddLabel,
    handleRemoveLabel,
    handleCategory,
    handleArticle,
  };
}
