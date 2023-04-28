import { Validator } from "lib/Validators";

export default class ValidateUpdateForgotPassword extends Validator {
  error = {
    error: false,
    resetPassword: {
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

  validateUpdateForgotPassword() {
    const { isLess, isEmpty } = this.checkStrSize({
      value: this.credentials.passwordReset,
      min: 30,
    });

    const { hasError: passwordHasError, message: passwordMessage } =
      this.executePasswordValidation(this.credentials.password);

    if (isLess || isEmpty)
      this.error.resetPassword = {
        hasError: true,
        message: "please paste password reset which is sent to your email",
      };

    if (passwordHasError)
      this.error.password = {
        hasError: passwordHasError,
        message: passwordMessage,
      };

    if (!this.error.error && (isLess || isEmpty || passwordHasError))
      this.error.error = true;

    return this.error;
  }
}
