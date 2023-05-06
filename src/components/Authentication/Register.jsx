/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { USER_GENDER } from "lib/config";

import {
  selectSentRegistrationStatus,
  selectRegistrationLoadingState,
} from "store/selectors/authenticationSelectors";

import { useAuthenticationQuery } from "hooks/queries";

import {
  Input,
  Select,
  DateForm,
  BTN,
  Error,
  StandSpinner,
} from "components/Layouts";
import TermsCheckbox from "./components/TermsCheckbox";
import SuccessfullRegistrationPopUp from "./components/SuccessfullRegistrationPopUp";
import LivingPlaceFields from "./components/LivingPlaceFields";
import AboutMeFields from "./components/AboutMeFields";
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
        <SuccessfullRegistrationPopUp
          onClick={() => navigate("/", { replace: true })}
        >
          <p>
            Your registration request is successfully sent !
            <br />
            We will email you after review your information.
          </p>
        </SuccessfullRegistrationPopUp>
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

        <LivingPlaceFields
          heading="From"
          // country
          countryName="countryFrom"
          countryError={regError.from.country.hasError}
          countryMessage={regError.from.country.message}
          resetCountryErrorHandler={() =>
            regError.from.country && resetFieldError("from", "country", true)
          }
          // city
          cityName="cityFrom"
          cityError={regError.from.city.hasError}
          cityMessage={regError.from.city.message}
          resetCityErrorHandler={() =>
            regError.from.city.hasError && resetFieldError("from", "city", true)
          }
        />

        <LivingPlaceFields
          heading="Currently Live In"
          // country
          countryName="currCountry"
          countryError={regError.livingPlace.country.hasError}
          countryMessage={regError.livingPlace.country.message}
          resetCountryErrorHandler={() =>
            regError.livingPlace.country &&
            resetFieldError("livingPlace", "country", true)
          }
          // city
          cityName="currCity"
          cityError={regError.livingPlace.city.hasError}
          cityMessage={regError.livingPlace.city.message}
          resetCityErrorHandler={() =>
            regError.livingPlace.city.hasError &&
            resetFieldError("livingPlace", "city", true)
          }
        />

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

        <AboutMeFields regError={regError} resetFieldError={resetFieldError} />

        <TermsCheckbox
          error={regError.terms.hasError}
          message={regError.terms.message}
          onChange={() => {
            regError.terms.hasError && resetFieldError("terms");
          }}
        />

        <BTN
          onClick={(e) => {
            e.preventDefault();
            sendRegistrationRequestQuery(formRef.current);
          }}
        >
          send information
        </BTN>
      </form>
    </div>
  );
}

export default Register;
