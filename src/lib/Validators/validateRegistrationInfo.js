import { Validator } from "./validators";

export default class ValidateRegistrationInfo extends Validator {
  error = {
    error: false,
    firstName: {
      hasError: false,
      message: "",
    },
    lastName: {
      hasError: false,
      message: "",
    },
    email: {
      hasError: false,
      message: "",
    },
    birthDate: {
      hasError: false,
      message: "",
    },
    gender: {
      hasError: false,
      message: "",
    },
    from: {
      country: {
        hasError: false,
        message: "",
      },
      city: {
        hasError: false,
        message: "",
      },
    },
    livingPlace: {
      country: {
        hasError: false,
        message: "",
      },
      city: {
        hasError: false,
        message: "",
      },
    },
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

  constructor(credentials) {
    super();
    this.credentials = credentials;
  }

  init() {
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validateGender();
    this.validateFrom();
    this.validateLivingPlace();
    this.validateCompany();
    this.validatePosition();
    this.validateDescription();
    this.validateBirthDate();

    return this.error;
  }

  validateFirstName() {
    const { hasError, message } = this.executeStrSizeAndLatinLetters({
      value: this.credentials.firstName,
      key: "firstname",
      min: 2,
    });

    const hasWhiteSpace = this.checkWhiteSpace({
      value: this.credentials.firstName,
    });

    if (hasWhiteSpace)
      this.error.firstName = {
        hasError: true,
        message: "firstname must not contain whitespaces",
      };

    if (hasError)
      this.error.firstName = {
        hasError,
        message,
      };

    if (!this.error.error && this.error.firstName.hasError)
      this.error.error = true;
  }

  validateLastName() {
    const { hasError, message } = this.executeStrSizeAndLatinLetters({
      value: this.credentials.lastName,
      key: "lastname",
      min: 2,
    });

    const hasWhiteSpace = this.checkWhiteSpace({
      value: this.credentials.lastName,
    });

    if (hasWhiteSpace)
      this.error.lastName = {
        hasError: true,
        message: "firstname must not contain whitespaces",
      };

    if (hasError)
      this.error.lastName = {
        hasError,
        message,
      };

    if (!this.error.error && this.error.lastName.hasError)
      this.error.error = true;
  }

  validateEmail() {
    const { hasError, message } = this.executeEmailValidation(
      this.credentials.email
    );

    if (hasError)
      this.error.email = {
        hasError,
        message,
      };

    if (!this.error.error && hasError) this.error.error = true;
  }

  validateBirthDate() {
    const { hasError, message } = this.executeDateValidation(
      this.credentials.birthDate
    );

    if (hasError)
      this.error.birthDate = {
        hasError,
        message,
      };

    if (!this.error.error && hasError) this.error.error = true;
  }

  validateGender() {
    const isValid = this.checkIsValidGender({ value: this.credentials.gender });

    if (!isValid)
      this.error.gender = {
        hasError: true,
        message: "please select a gender",
      };

    if (!this.error.error && this.error.gender.hasError)
      this.error.error = true;
  }

  validateFrom() {
    const { hasError: countryHasError, message: countryMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.from.country,
        min: 2,
        key: "country",
        withDash: true,
      });

    const { hasError: cityHasError, message: cityMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.from.city,
        min: 2,
        key: "city",
        withDash: true,
      });

    if (countryHasError)
      this.error.from.country = {
        hasError: countryHasError,
        message: countryMessage,
      };

    if (cityHasError)
      this.error.from.city = {
        hasError: cityHasError,
        message: cityMessage,
      };

    if (!this.error.error && (countryHasError || cityHasError))
      this.error.error = true;
  }

  validateLivingPlace() {
    const { hasError: countryHasError, message: countryMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.currentLivingPlace.country,
        min: 2,
        key: "country",
        withDash: true,
      });

    const { hasError: cityHasError, message: cityMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.currentLivingPlace.city,
        min: 2,
        key: "city",
        withDash: true,
      });

    if (countryHasError)
      this.error.livingPlace.country = {
        hasError: countryHasError,
        message: countryMessage,
      };

    if (cityHasError)
      this.error.livingPlace.city = {
        hasError: cityHasError,
        message: cityMessage,
      };

    if (!this.error.error && (countryHasError || cityHasError))
      this.error.error = true;
  }

  validateCompany() {
    const { institutionHasError, institutionMessage } =
      this.executeValidateInstitution(
        this.credentials.registrationBio.institution
      );

    if (institutionHasError)
      this.error.institution = {
        hasError: institutionHasError,
        message: institutionMessage,
      };

    if (!this.error.error && institutionHasError) this.error.error = true;
  }

  validatePosition() {
    const isValidPoition = this.executeValidatePosition(
      this.credentials.registrationBio.position
    );

    if (!isValidPoition)
      this.error.position = {
        hasError: true,
        message: "please select a position",
      };

    if (!this.error.error && this.error.position.hasError)
      this.error.error = true;
  }

  validateDescription() {
    const { isEmptyDescription, isValidDescription, descriptionHasLeft } =
      this.executeValidateCurrentWorkplaceDescription(
        this.credentials.registrationBio.description
      );

    if (isEmptyDescription || !isValidDescription)
      this.error.description = {
        hasError: true,
        message: `please enter information about yourself. At least 10 word. Left ${descriptionHasLeft}`,
      };

    if (!this.error.error && this.error.description.hasError)
      this.error.error = true;
  }
}
