/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuthenticationQuery } from "../../hooks";
import {
  selectAuthLoadingState,
  selectResetPasswordIsSuccessfullySet,
} from "../../store/selectors/authenticationSelectors";

import styles from "./styles/auth.module.scss";
import { Input, StandSpinner, Error } from "../Layouts";

function ForgotPassword() {
  const navigate = useNavigate();

  const { success } = useSelector(selectResetPasswordIsSuccessfullySet);

  const {
    forgotPasswordError,
    setForgotPasswordError,
    sendForgotPasswordQuery,
    cleanUpForgotPassword,
  } = useAuthenticationQuery();

  const { loading, error, message } = useSelector(selectAuthLoadingState);

  useEffect(() => {
    if (success)
      navigate("/authentication/forgot-password/update", { replace: true });
  }, [success]);

  useEffect(() => {
    return () => cleanUpForgotPassword();
  }, []);

  return (
    <>
      <form onSubmit={sendForgotPasswordQuery} className={styles.authForm}>
        <Input
          type="text"
          name="email"
          placeholder="email"
          label="email"
          id="email"
          error={forgotPasswordError.hasError}
          message={forgotPasswordError.message}
          onChange={() =>
            forgotPasswordError.hasError &&
            setForgotPasswordError({ hasError: false, message: "" })
          }
        />

        {error && <Error msg={message} />}

        {!loading && <button type="submit">send email</button>}
      </form>

      {loading && <StandSpinner />}
    </>
  );
}

export default ForgotPassword;
