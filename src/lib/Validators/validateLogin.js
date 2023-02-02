import { Validator } from "./validators";

export default class ValidateLogin extends Validator {
  error = {
    error: false,
    email: {
      hasError: false,
      message: "",
    },
    password: {
      hasError: false,
      message: "",
    },
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validateLoginForm() {
    const { hasError: emailHasError, message: emailMessage } =
      this.executeEmailValidation(this.credentials.email);

    const { hasError: passwordHasError, message: passwordMessage } =
      this.executePasswordValidation(this.credentials.password);

    if (emailHasError)
      this.error.email = {
        hasError: emailHasError,
        message: emailMessage,
      };

    if (passwordHasError)
      this.error.password = {
        hasError: passwordHasError,
        message: passwordMessage,
      };

    if (!this.error.error && (emailHasError || passwordHasError))
      this.error.error = true;

    return this.error;
  }
}
