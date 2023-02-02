import { ValidateCreateBlogPost, ValidateCreatePost } from "../../lib";

export default function useValidateCreatePost() {
  function validateCreateBlogPost(credentials) {
    const { createError } = new ValidateCreateBlogPost(credentials)
      .validateTitle()
      .validateLabels()
      .validateCategory()
      .validateArticle();

    return createError;
  }

  function validateCreatePost(credentials) {
    const { createError } = new ValidateCreatePost(credentials).validatePost();

    return createError;
  }

  return {
    validateCreateBlogPost,
    validateCreatePost,
  };
}
