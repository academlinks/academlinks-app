import { Validator } from "lib/Validators";

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
    terms: {
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
    this.validateTerms();

    return this.error;
  }

  validateFirstName() {
    // execute validations
    const { hasError, message } = this.executeStrSizeAndLatinLetters({
      value: this.credentials.firstName,
      key: "firstname",
      min: 2,
    });

    const hasWhiteSpace = this.checkWhiteSpace({
      value: this.credentials.firstName,
    });

    // set messages and error
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
    // execute validations
    const { hasError, message } = this.executeStrSizeAndLatinLetters({
      value: this.credentials.lastName,
      key: "lastname",
      min: 2,
    });

    const hasWhiteSpace = this.checkWhiteSpace({
      value: this.credentials.lastName,
    });

    // set messages and error
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
    // execute validations
    const { hasError, message } = this.executeEmailValidation(
      this.credentials.email
    );

    // set messages and error
    if (hasError)
      this.error.email = {
        hasError,
        message,
      };

    if (!this.error.error && hasError) this.error.error = true;
  }

  validateBirthDate() {
    // execute validations
    const { hasError, message } = this.executeDateValidation(
      this.credentials.birthDate
    );

    // set messages and error
    if (hasError)
      this.error.birthDate = {
        hasError,
        message,
      };

    if (!this.error.error && hasError) this.error.error = true;
  }

  validateGender() {
    // execute validations
    const isValid = this.checkIsValidGender({ value: this.credentials.gender });

    // set messages and error
    if (!isValid)
      this.error.gender = {
        hasError: true,
        message: "please select a gender",
      };

    if (!this.error.error && this.error.gender.hasError)
      this.error.error = true;
  }

  validateFrom() {
    // execute validations
    const countryHasError = this.checkCountry({
      value: this.credentials.from.country,
    });

    const { hasError: cityHasError, message: cityMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.from.city,
        min: 2,
        key: "city",
        withDash: true,
      });

    // set messages and error
    if (countryHasError)
      this.error.from.country = {
        hasError: countryHasError,
        message: "please enter valid country",
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
    // execute validations
    const countryHasError = this.checkCountry({
      value: this.credentials.currentLivingPlace.country,
    });

    const { hasError: cityHasError, message: cityMessage } =
      this.executeStrSizeAndLatinLetters({
        value: this.credentials.currentLivingPlace.city,
        min: 2,
        key: "city",
        withDash: true,
      });

    // set messages and error
    if (countryHasError)
      this.error.livingPlace.country = {
        hasError: countryHasError,
        message: "please enter valid country",
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
    // execute validations
    const { institutionHasError, institutionMessage } =
      this.executeValidateInstitution(
        this.credentials.registrationBio.institution
      );

    if (institutionHasError)
      this.error.institution = {
        hasError: institutionHasError,
        message: institutionMessage,
      };

    // set messages and error
    if (!this.error.error && institutionHasError) this.error.error = true;
  }

  validatePosition() {
    // execute validations
    const isValidPoition = this.executeValidatePosition(
      this.credentials.registrationBio.position
    );

    // set messages and error
    if (!isValidPoition)
      this.error.position = {
        hasError: true,
        message: "please select a position",
      };

    if (!this.error.error && this.error.position.hasError)
      this.error.error = true;
  }

  validateDescription() {
    // execute validations
    const { isEmptyDescription, isValidDescription, descriptionHasLeft } =
      this.executeValidateCurrentWorkplaceDescription(
        this.credentials.registrationBio.description
      );

    // set messages and error
    if (isEmptyDescription || !isValidDescription)
      this.error.description = {
        hasError: true,
        message: `please enter information about yourself. At least 10 word. Left ${descriptionHasLeft}`,
      };

    if (!this.error.error && this.error.description.hasError)
      this.error.error = true;
  }

  validateTerms() {
    if (!this.credentials.terms) {
      this.error.error = true;
      this.error.terms = {
        hasError: true,
        message:
          "please accept to all the terms and conditions before sending registration request.",
      };
    }
  }
}
