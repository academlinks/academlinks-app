import validator from "validator";
import {
  VALID_BLOG_POST_CATEGORIES,
  USER_GENDER,
  USER_WORKPLACE_POSITIONS,
  VALID_DEGREES,
  VALID_COUNTRIES,
} from "../config";

export class Validator {
  _blogPostTitleMinLetterCount = 3;

  _blogPostMinWordCount = 300;

  _avalableBlogPostCategories = VALID_BLOG_POST_CATEGORIES;

  _validCountries = VALID_COUNTRIES;

  availableGenders = USER_GENDER;

  availablePositions = USER_WORKPLACE_POSITIONS;

  passwordMinLength = 6;

  currWorkplaceMinWordCount = 10;

  availableDegress = VALID_DEGREES;

  // regexes
  regs = {
    whiteSpace: /\s/g,
    isEmail:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    onlyLatinLetters: /^[A-Za-z\s]*$/,
    onlyLatinLettersAndDash: /^[A-Za-z\s-]*$/,
    validPassword: /^([a-zA-Z0-9-_.]{6,})*$/g,
    isWord: /\w/g,
  };

  //////////////////////////////////////////////

  checkStrSize({ value, min }) {
    if (!value || !value.trim()) return { isLess: false, isEmpty: true };
    else if (min && value.trim().length < min)
      return { isLess: true, isEmpty: false };
    else return { isLess: false, isEmpty: false };
  }

  checkArrSize({ data }) {
    if (!data || !Array.isArray(data) || !data[0]) return { isEmpty: true };
    else return { isEmpty: false };
  }

  checkValidBlogPostCategory(category) {
    if (!this._avalableBlogPostCategories.some((cat) => cat === category))
      return { isValid: false };
    else return { isValid: true };
  }

  checkWordCount({ data, min }) {
    if (typeof data !== "string" || !data.trim())
      return { isEmpty: true, isValid: false, isLeft: NaN };

    const fragments = data
      .trim()
      .split(" ")
      .filter((w) => w.trim() !== "");

    if (Array.isArray(fragments) && !fragments[0])
      return { isEmpty: true, isValid: false, isLeft: NaN };
    else if (Array.isArray(fragments) && fragments.length < min)
      return {
        isEmpty: false,
        isValid: false,
        isLeft: min - fragments.length,
      };
    else return { isEmpty: false, isValid: true, isLeft: NaN };
  }

  checkDate({ date }) {
    return validator.isDate(new Date(date));
  }

  checkDegree({ value }) {
    return this.availableDegress.includes(value);
  }

  checkCountry({ value }) {
    return !this._validCountries.includes(value);
  }

  checkOnlyLatinLetters({ value }) {
    return this.regs.onlyLatinLetters.test(value);
  }

  checkOnlyLatinLettersAndDash({ value }) {
    return this.regs.onlyLatinLettersAndDash.test(value);
  }

  checkIsEmail({ value }) {
    return this.regs.isEmail.test(value);
  }

  checkIsValidGender({ value }) {
    return this.availableGenders.includes(value);
  }

  checkIsValidWokplacePosition({ value }) {
    return this.availablePositions.includes(value);
  }

  checkWhiteSpace({ value }) {
    return this.regs.whiteSpace.test(value);
  }

  validPassword({ value }) {
    return (
      value?.trim() &&
      this.regs.validPassword.test(value) &&
      !this.regs.whiteSpace.test(value)
    );
  }

  // helpers
  executeStrSizeAndLatinLetters({
    value,
    min,
    withDash = false,
    key,
    // location,
  }) {
    const { isEmpty, isLess } = this.checkStrSize({ value, min });

    const isLatin = withDash
      ? this.checkOnlyLatinLettersAndDash({ value })
      : this.checkOnlyLatinLetters({ value });

    let message = {
      hasError: false,
      message: "",
    };

    if (isEmpty)
      message = {
        hasError: true,
        message: `please enter ${key}`,
      };
    else if (min && isLess)
      message = {
        hasError: true,
        message: `${key} must contain min ${min} letter`,
      };
    else if (!isLatin)
      message = {
        hasError: true,
        message: `${key} must contain only latin letters`,
      };

    return message;
  }

  executeDateValidation(date) {
    const isDate = this.checkDate({ date });

    return !isDate
      ? {
          hasError: true,
          message: "please enter valid date",
        }
      : {
          hasError: false,
          message: "",
        };
  }

  executePasswordValidation(pass) {
    const isValidPassword = this.validPassword({
      value: pass,
    });

    return !isValidPassword
      ? {
          hasError: true,
          message:
            "Invalid password. Password must contain only: latin letters, numbers from 0-9, symbosls(' . ' ' _ ' ' - ') and must contain min 6 letter.",
        }
      : { hasError: false, message: "" };
  }

  executeEmailValidation(email) {
    const isEmail = this.checkIsEmail({ value: email });

    return !isEmail
      ? {
          hasError: true,
          message: "please enter valid email",
        }
      : { hasError: false, message: "" };
  }

  executeValidateInstitution(value) {
    const { hasError: institutionHasError, message: institutionMessage } =
      this.executeStrSizeAndLatinLetters({
        value,
        min: 3,
        key: "institution",
      });

    return { institutionHasError, institutionMessage };
  }

  executeValidatePosition(value) {
    return this.checkIsValidWokplacePosition({
      value,
    });
  }

  executeValidateCurrentWorkplaceDescription(value) {
    const {
      isEmpty: isEmptyDescription,
      isValid: isValidDescription,
      isLeft: descriptionHasLeft,
    } = this.checkWordCount({
      data: value,
      min: this.currWorkplaceMinWordCount,
    });

    return { isEmptyDescription, isValidDescription, descriptionHasLeft };
  }
}
