import { Validator } from "lib/Validators";

export default class ValidateForgotPassword extends Validator {
  createError = {
    hasError: false,
    message: "",
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validateForgotPassword() {
    const { hasError: emailHasError, message: emailMessage } =
      this.executeEmailValidation(this.credentials.email);

    if (emailHasError)
      this.createError = {
        hasError: emailHasError,
        message: emailMessage,
      };

    return this.createError;
  }
}
