import { Validator } from "./validators";

export default class ValidateCreatePost extends Validator {
  createError = {
    error: false,
    message: "",
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validatePost() {
    const { isEmpty: tagsIsEmpty } = this.validateTags();
    const { isEmpty: mediaIsEmpty } = this.validateMedia();
    const { isEmpty: imagesIsEmpty } = this.validateImages();
    const { isEmpty: descriptionIsEmpty, isLess } = this.validateDescription();

    if (
      tagsIsEmpty &&
      mediaIsEmpty &&
      imagesIsEmpty &&
      (descriptionIsEmpty || isLess)
    ) {
      this.createError.error = true;
      this.createError.message =
        "Validation Error. Please provide us some value";
    }

    return this;
  }

  validateTags() {
    const tags = this.credentials.tags ? JSON.parse(this.credentials.tags) : [];

    return this.checkArrSize({ data: tags });
  }

  validateMedia() {
    const media = this.credentials.media
      ? JSON.parse(this.credentials.media)
      : [];

    return this.checkArrSize({ data: media });
  }

  validateImages() {
    return this.checkArrSize({ data: this.credentials.images });
  }

  validateDescription() {
    return this.checkStrSize({ value: this.credentials.description, min: 2 });
  }
}
