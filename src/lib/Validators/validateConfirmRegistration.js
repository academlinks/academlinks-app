import { Validator } from "./validators";

export default class ValidateConfirmRegister extends Validator {
  error = {
    hasError: false,
    message: "",
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validateConfirmPassword() {
    const { hasError, message } = this.executePasswordValidation(
      this.credentials.password
    );

    if (hasError)
      this.error = {
        hasError,
        message,
      };

    return this.error;
  }
}
