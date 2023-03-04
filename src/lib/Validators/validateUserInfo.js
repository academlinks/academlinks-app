import { Validator } from "./validators";

export default class ValidateUserInfo extends Validator {
  birthDateError = {
    error: false,
    message: "",
  };

  livingPlaceError = {
    error: false,
    city: {
      hasError: false,
      message: "",
    },
    country: {
      hasError: false,
      message: "",
    },
  };

  educationError = {
    error: false,
    collage: {
      hasError: false,
      message: "",
    },

    faculty: {
      hasError: false,
      message: "",
    },

    degree: {
      hasError: false,
      message: "",
    },
  };

  workPlaceError = {
    error: false,
    institution: {
      hasError: false,
      message: "",
    },

    position: {
      hasError: false,
      message: "",
    },
  };

  currentWorkPlaceError = {
    error: false,

    institution: {
      hasError: false,
      message: "",
    },

    position: {
      hasError: false,
      message: "",
    },

    description: {
      hasError: false,
      message: "",
    },
  };

  passwordError = {
    error: false,
    currentPassword: {
      hasError: false,
      message: "",
    },
    newPassword: {
      hasError: false,
      message: "",
    },
  };

  emailError = {
    error: false,
    email: {
      hasError: false,
      message: "",
    },
    password: {
      hasError: false,
      message: "",
    },
    newEmail: {
      hasError: false,
      message: "",
    },
  };

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  validateBirthdate() {
    const { hasError, message } = this.executeDateValidation(this.credentials);

    if (hasError)
      this.error.birthDate = {
        hasError,
        message,
      };

    return this;
  }

  validateLivingplace() {
    const countryHasError = this.checkCountry({
      value: this.credentials.country,
    });

    const { hasError: cityHasError, message: cityMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.city,
        min: 2,
        key: "city",
        withDash: true,
      });

    if (countryHasError)
      this.livingPlaceError.country = {
        hasError: countryHasError,
        message: "please enter valid country",
      };

    if (cityHasError)
      this.livingPlaceError.city = {
        hasError: cityHasError,
        message: cityMessage,
      };

    if (!this.livingPlaceError.error && (countryHasError || cityHasError))
      this.livingPlaceError.error = true;

    return this;
  }

  validateEducation() {
    const isValidDegree = this.checkDegree({
      value: this.credentials.degree,
    });

    const { hasError: collageHasError, message: collageMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.collage,
        key: "collage",
        withDash: true,
      });

    const { hasError: facultyHasError, message: facultyMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.faculty,
        key: "faculty",
        withDash: true,
      });

    if (!isValidDegree)
      this.educationError.degree = {
        hasError: true,
        message: "please select the degree",
      };

    if (collageHasError)
      this.educationError.collage = {
        hasError: true,
        message: collageMessage,
      };

    if (facultyHasError)
      this.educationError.faculty = {
        hasError: true,
        message: facultyMessage,
      };

    if (collageHasError || facultyHasError || !isValidDegree)
      this.educationError.error = true;

    return this;
  }

  validateWorkplace() {
    const { hasError: institutionHasError, message: institutionMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.institution,
        key: "institution",
        withDash: true,
      });

    const { hasError: positionHasError, message: positionMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.position,
        key: "position",
        withDash: true,
      });

    if (institutionHasError)
      this.workPlaceError.institution = {
        hasError: true,
        message: institutionMessage,
      };

    if (positionHasError)
      this.workPlaceError.position = {
        hasError: true,
        message: positionMessage,
      };

    if (institutionHasError || positionHasError)
      this.workPlaceError.error = true;

    return this;
  }

  validateCurrentWorkplace() {
    const { institutionHasError, institutionMessage } =
      this.executeValidateInstitution(this.credentials.institution);

    const isValidPoition = this.executeValidatePosition(
      this.credentials.position
    );

    const { isEmptyDescription, isValidDescription, descriptionHasLeft } =
      this.executeValidateCurrentWorkplaceDescription(
        this.credentials.description
      );

    if (institutionHasError)
      this.currentWorkPlaceError.institution = {
        hasError: true,
        message: institutionMessage,
      };

    if (!isValidPoition)
      this.currentWorkPlaceError.position = {
        hasError: true,
        message: "please select position",
      };

    if (isEmptyDescription || !isValidDescription)
      this.currentWorkPlaceError.description = {
        hasError: true,
        message: `please enter information about yourself. At least 10 word. Left ${descriptionHasLeft}`,
      };

    if (
      institutionHasError ||
      !isValidPoition ||
      isEmptyDescription ||
      !isValidDescription
    )
      this.currentWorkPlaceError.error = true;

    return this;
  }

  validatePassword() {
    const { hasError: passwordHasError, message: passwordMessage } =
      this.executePasswordValidation(this.credentials.password);

    const { hasError: newPasswordHasError, message: newPasswordMessage } =
      this.executePasswordValidation(this.credentials.newPassword);

    if (passwordHasError)
      this.passwordError.currentPassword = {
        hasError: true,
        message: passwordMessage,
      };

    if (newPasswordHasError)
      this.passwordError.newPassword = {
        hasError: true,
        message: newPasswordMessage,
      };

    if (!this.passwordError.error && (passwordHasError || newPasswordHasError))
      this.passwordError.error = true;

    return this;
  }

  validateEmail() {
    const { hasError: emailHasError, message: emailMessage } =
      this.executeEmailValidation(this.credentials.email);

    const { hasError: newEmailHasError, message: newEmailMessage } =
      this.executeEmailValidation(this.credentials.newEmaiL);

    const { hasError: passwordHasError, message: passwordMessage } =
      this.executePasswordValidation(this.credentials.password);

    if (passwordHasError)
      this.emailError.password = {
        hasError: true,
        message: passwordMessage,
      };

    if (emailHasError)
      this.emailError.email = {
        hasError: true,
        message: emailMessage,
      };

    if (newEmailHasError)
      this.emailError.newEmail = {
        hasError: true,
        message: newEmailMessage,
      };

    if (
      !this.emailError.error &&
      (passwordHasError || emailHasError || newEmailHasError)
    )
      this.emailError.error = true;

    return this;
  }
}
