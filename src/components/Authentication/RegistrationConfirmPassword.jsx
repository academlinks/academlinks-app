/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectAuthLoadingState,
  selectRegistrationLoadingState,
  selectIsExistingRequestAndSuccessMessage,
} from "../../store/selectors/authenticationSelectors";
import { selectActiveUser } from "../../store/selectors/activeUserSelectors";
import { useAuthenticationQuery } from "../../hooks";

import styles from "./styles/auth.module.scss";
import { BTN, Input, StandSpinner, Error } from "../Layouts";

function RegistrationConfirmPassword() {
  const { registrationId, tokenId } = useParams();
  const navigate = useNavigate();

  // for check registration request loading state
  const {
    loading: registerLoading,
    error: registerError,
    message: registerMessage,
  } = useSelector(selectRegistrationLoadingState);
  // for check registration existance loading state
  const { loading, error, message } = useSelector(selectAuthLoadingState);

  const { isAuthenticated } = useSelector(selectActiveUser);
  const { isExistingRegister, successfullRegistration } = useSelector(
    selectIsExistingRequestAndSuccessMessage
  );

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const {
    // locale errors
    confirmRegError,
    setConfirmRegError,
    // NaN API Handlers
    resetAuthLoadingErrorHandler,
    resetRegistrationErrorHandler,
    cleanUpRegistrationConfirm,
    // API Handlers
    checkExistingRegisterQuery,
    sendRegisterPasswordConfirmQuery,
    logOutQuery,
  } = useAuthenticationQuery();

  useEffect(() => {
    if (isAuthenticated) logOutQuery();
    checkExistingRegisterQuery({ requestId: registrationId, tokenId });
  }, []);

  useEffect(() => {
    if (registerLoading || !successfullRegistration || registerError) return;
    setSuccessModalIsOpen(true);

    return () => cleanUpRegistrationConfirm();
  }, [registerLoading, successfullRegistration, registerError]);

  return (
    <div className={styles.registrationConfirmPasswordContainer}>
      {(loading || registerLoading) && <StandSpinner />}

      {!loading && !error && (
        <form
          className={styles.registerConfirmPasswordForm}
          onSubmit={(e) => {
            e.preventDefault();
            sendRegisterPasswordConfirmQuery(
              e.currentTarget,
              isExistingRegister,
              {
                requestId: registrationId,
                tokenId,
              }
            );
          }}
        >
          <Input
            name="password"
            placeholder="enter your password"
            type="password"
            error={confirmRegError.hasError}
            message={confirmRegError.message}
            onChange={() => {
              confirmRegError.hasError &&
                setConfirmRegError({
                  hasError: false,
                  message: "",
                });
            }}
          />

          <BTN disabled={!isExistingRegister} type="submit">
            confirm password
          </BTN>
        </form>
      )}

      {(error || registerError) && (
        <Error
          asModal={true}
          msg={error ? message : registerError ? registerMessage : ""}
          onClose={
            error
              ? resetAuthLoadingErrorHandler
              : registerError
              ? resetRegistrationErrorHandler
              : () => {}
          }
        />
      )}

      {successModalIsOpen && (
        <div className={styles.successModalBackDrop}>
          <div className={styles.successModalBox}>
            <p>You are registered successfully !</p>
            <BTN
              onClick={() =>
                navigate("/authentication/login", { replace: true })
              }
            >
              go for authorization
            </BTN>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationConfirmPassword;
