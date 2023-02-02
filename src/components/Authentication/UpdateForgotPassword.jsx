/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAuthLoadingState,
  selectPasswordIsSuccessfullyUpdated,
} from "../../store/selectors/authenticationSelectors";
import { useAuthenticationQuery } from "../../hooks";

import styles from "./styles/auth.module.scss";
import { Input, StandSpinner, Error } from "../Layouts";

function UpdateForgotPassword() {
  const navigate = useNavigate();

  const { success } = useSelector(selectPasswordIsSuccessfullyUpdated);

  const { loading, error, message } = useSelector(selectAuthLoadingState);

  const {
    updateForgotPasswordError,
    setUpdateForgotPasswordError,
    sendUpdateForgotPasswordQuery,
    cleanUpUpdateForgotPassword,
  } = useAuthenticationQuery();

  useEffect(() => {
    if (success) navigate("/authentication/login", { replace: true });
  }, [success]);

  useEffect(() => {
    return () => cleanUpUpdateForgotPassword();
  }, []);

  return (
    <>
      <form
        onSubmit={sendUpdateForgotPasswordQuery}
        className={styles.authForm}
      >
        <p className={styles.resetPswMsg}>
          <span>Temporary password is sent to your email.</span>
          <span>(Valid for 10 minute)</span>
        </p>

        <Input
          type="text"
          name="passwordReset"
          placeholder="reset password"
          label="temporary password"
          id="passwordReset"
          error={updateForgotPasswordError.resetPassword.hasError}
          message={updateForgotPasswordError.resetPassword.message}
          onChange={(e) =>
            updateForgotPasswordError.resetPassword.hasError &&
            setUpdateForgotPasswordError((prev) => ({
              ...prev,
              resetPassword: {
                hasError: false,
                message: "",
              },
            }))
          }
        />

        <Input
          type="password"
          name="password"
          placeholder="**********"
          label="new password"
          id="password"
          error={updateForgotPasswordError.password.hasError}
          message={updateForgotPasswordError.password.message}
          onChange={(e) =>
            updateForgotPasswordError.password.hasError &&
            setUpdateForgotPasswordError((prev) => ({
              ...prev,
              password: {
                hasError: false,
                message: "",
              },
            }))
          }
        />

        {error && <Error msg={message} />}

        {!loading && <button type="submit">update password</button>}
      </form>

      {loading && <StandSpinner />}
    </>
  );
}

export default UpdateForgotPassword;
