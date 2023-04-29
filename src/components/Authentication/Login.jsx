/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuthenticationQuery } from "hooks/queries";
import { selectActiveUserLoadingState } from "store/selectors/activeUserSelectors";

import styles from "./styles/auth.module.scss";
import TermsAndPolicyLink from "./TermsAndPolicyLink";
import { Input, StandSpinner, Error } from "components/Layouts";

function Login() {
  const { loginQuery, loginError, resetLoginErrorHandler } =
    useAuthenticationQuery();

  const { loading, error, message } = useSelector(selectActiveUserLoadingState);

  useEffect(() => {
    return () => {
      resetLoginErrorHandler();
    };
  }, []);

  return (
    <>
      <form onSubmit={loginQuery} className={styles.authForm}>
        <Input
          type="text"
          name="email"
          placeholder="email"
          label="email"
          id="email"
          error={loginError.email.hasError}
          message={loginError.email.message}
        />

        <Input
          type="password"
          name="password"
          placeholder="**********"
          label="password"
          id="password"
          error={loginError.password.hasError}
          message={loginError.password.message}
        />

        {error && <Error msg={message} />}

        <Link
          to="/authentication/forgot-password"
          className={styles.forgotPassword}
        >
          forgot password
        </Link>

        {!loading && <button type="submit">login</button>}

        <TermsAndPolicyLink />
      </form>

      {loading && <StandSpinner />}
    </>
  );
}

export default Login;
