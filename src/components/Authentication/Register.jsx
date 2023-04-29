/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  USER_WORKPLACE_POSITIONS,
  USER_GENDER,
  VALID_COUNTRIES,
} from "lib/config";

import {
  selectSentRegistrationStatus,
  selectRegistrationLoadingState,
} from "store/selectors/authenticationSelectors";

import { useAuthenticationQuery } from "hooks/queries";

import {
  Input,
  TextField,
  Select,
  DateForm,
  BTN,
  Error,
  StandSpinner,
} from "components/Layouts";
import TermsAndPolicyLink from "./TermsAndPolicyLink";
import styles from "./styles/reg.module.scss";

function Register() {
  const navigate = useNavigate();

  const isSent = useSelector(selectSentRegistrationStatus);
  const { loading, error, message } = useSelector(
    selectRegistrationLoadingState
  );

  const {
    regError,
    setRegError,
    sendRegistrationRequestQuery,
    resetRegistrationErrorHandler,
  } = useAuthenticationQuery();

  const formRef = useRef();

  useEffect(() => {
    if (isSent) formRef.current.reset();
  }, [isSent]);

  useEffect(() => {
    return () => resetRegistrationErrorHandler();
  }, []);

  function resetFieldError(field, nestedField, nested = false) {
    if (!nested)
      setRegError((prev) => ({
        ...prev,
        [field]: {
          hasError: false,
          message: "",
        },
      }));
    else
      setRegError((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [nestedField]: {
            hasError: false,
            message: "",
          },
        },
      }));
  }

  return (
    <div className={styles.regContainer}>
      {isSent && (
        <div className={styles.successModalContainer}>
          <div className={styles.successModal}>
            <p>
              Your registration request is successfully sent !
              <br />
              We will email you after review your information.
            </p>
            <BTN onClick={() => navigate("/", { replace: true })}>ok</BTN>
          </div>
        </div>
      )}

      {error && (
        <Error
          asModal={true}
          msg={message}
          onClose={resetRegistrationErrorHandler}
        />
      )}

      {loading && <StandSpinner />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendRegistrationRequestQuery(formRef.current);
        }}
        className={styles.regForm}
        ref={formRef}
      >
        <Input
          label="first name"
          name="firstName"
          placeholder="first name"
          className={styles.inpField}
          error={regError.firstName.hasError}
          message={regError.firstName.message}
          onChange={() => {
            regError.firstName.hasError && resetFieldError("firstName");
          }}
        />

        <Input
          label="last name"
          name="lastName"
          placeholder="last name"
          className={styles.inpField}
          error={regError.lastName.hasError}
          message={regError.lastName.message}
          onChange={() => {
            regError.lastName.hasError && resetFieldError("lastName");
          }}
        />

        <Input
          label="email"
          name="email"
          placeholder="email"
          anotation={"Please indicate institutional email"}
          className={styles.inpField}
          error={regError.email.hasError}
          message={regError.email.message}
          onChange={() => {
            regError.email.hasError && resetFieldError("email");
          }}
        />

        <DateForm
          label={"birthDate"}
          name="birthDate"
          error={regError.birthDate.hasError}
          message={regError.birthDate.message}
          handler={() => {
            regError.birthDate.hasError && resetFieldError("birthDate");
          }}
        />

        <div className={styles.livingPlaceFieldsContainer}>
          <span className={styles.formHeading}>From</span>

          <div className={styles.livingPlaceFields}>
            <Select
              name="countryFrom"
              label="country"
              error={regError.from.country.hasError}
              message={regError.from.country.message}
              data={{
                values: VALID_COUNTRIES,
                default: {
                  label: "country",
                  value: "country",
                },
              }}
              handler={() => {
                regError.from.country &&
                  resetFieldError("from", "country", true);
              }}
            />

            <Input
              name="cityFrom"
              label="city"
              placeholder="city"
              className={styles.inpField}
              error={regError.from.city.hasError}
              message={regError.from.city.message}
              onChange={() => {
                regError.from.city.hasError &&
                  resetFieldError("from", "city", true);
              }}
            />
          </div>
        </div>

        <div className={styles.livingPlaceFieldsContainer}>
          <span className={styles.formHeading}>Currently Live In</span>

          <div className={styles.livingPlaceFields}>
            <Select
              name="currCountry"
              label="country"
              error={regError.livingPlace.country.hasError}
              message={regError.livingPlace.country.message}
              data={{
                values: VALID_COUNTRIES,
                default: {
                  label: "country",
                  value: "country",
                },
              }}
              handler={() => {
                regError.from.country &&
                  resetFieldError("livingPlace", "country", true);
              }}
            />

            <Input
              name="currCity"
              label="city"
              placeholder="city"
              className={styles.inpField}
              message={regError.livingPlace.city.message}
              error={regError.livingPlace.city.hasError}
              onChange={() => {
                regError.livingPlace.city.hasError &&
                  resetFieldError("livingPlace", "city", true);
              }}
            />
          </div>
        </div>

        <Select
          name="gender"
          label="gender"
          error={regError.gender.hasError}
          message={regError.gender.message}
          data={{
            default: "gender",
            values: USER_GENDER,
            name: "gender",
          }}
          handler={() => {
            regError.gender.hasError && resetFieldError("gender");
          }}
        />

        <p className={styles.formHeading}>About Me</p>
        <div className={styles.workplaceFieldsContainer}>
          <Input
            name="institution"
            label="institution"
            type="text"
            placeholder="institution"
            className={styles.inpField}
            error={regError.institution.hasError}
            message={regError.institution.message}
            onChange={() => {
              regError.institution.hasError && resetFieldError("institution");
            }}
          />

          <Select
            name="position"
            label="position"
            error={regError.position.hasError}
            message={regError.position.message}
            data={{
              default: "position",
              name: "position",
              values: USER_WORKPLACE_POSITIONS,
            }}
            handler={() => {
              regError.position.hasError && resetFieldError("position");
            }}
          />

          <TextField
            name="description"
            minRows={4}
            maxRows={8}
            className={styles.textFieldDesc}
            placeholder="description"
            label="bio"
            error={regError.description.hasError}
            message={regError.description.message}
            onChange={() => {
              regError.description.hasError && resetFieldError("description");
            }}
          />
        </div>

        <BTN
          onClick={(e) => {
            e.preventDefault();
            sendRegistrationRequestQuery(formRef.current);
          }}
        >
          send information
        </BTN>

        <TermsAndPolicyLink />
      </form>
    </div>
  );
}

export default Register;
