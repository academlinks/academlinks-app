import { Validator } from "./validators";

export default class ValidateBlogPostCreate extends Validator {
  createError = {
    error: false,
    title: {
      hasError: false,
      message: "",
    },
    labels: {
      hasError: false,
      message: "",
    },
    category: {
      hasError: false,
      message: "",
    },
    article: {
      hasError: false,
      message: "",
    },
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validateTitle() {
    const { isEmpty, isLess } = this.checkStrSize({
      value: this.credentials.title,
      min: this._blogPostTitleMinLetterCount,
    });

    if (isEmpty)
      this.createError.title = {
        hasError: true,
        message: "please enter the post title",
      };
    else if (isLess)
      this.createError.title = {
        hasError: true,
        message: "title must contains min 3 letters",
      };

    if (isEmpty || isLess) this.createError.error = true;

    return this;
  }

  validateLabels() {
    const labels = this.credentials.labels
      ? JSON.parse(this.credentials.labels)
      : [];

    const { isEmpty } = this.checkArrSize({ data: labels });

    if (isEmpty) {
      this.createError.error = true;
      this.createError.labels = {
        hasError: true,
        message: "please enter at least 1 label",
      };
    }

    return this;
  }

  validateCategory() {
    const { isValid } = this.checkValidBlogPostCategory(this.credentials.category);

    if (!isValid) {
      this.createError.error = true;
      this.createError.category = {
        hasError: true,
        message: "please select the category",
      };
    }

    return this;
  }

  validateArticle() {
    const { isEmpty, isValid, isLeft } = this.checkWordCount({
      data: this.credentials.article,
      min: this._blogPostMinWordCount,
    });

    if (isEmpty)
      this.createError.article = {
        hasError: true,
        message: "please enter article text",
      };
    if (!isValid)
      this.createError.article = {
        hasError: true,
        message: `article must contain min ${this._blogPostMinWordCount} word. Left ${isLeft} word.`,
      };

    if (isEmpty || !isValid) this.createError.error = true;

    return this;
  }
}
