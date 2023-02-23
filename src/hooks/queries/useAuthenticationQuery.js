import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoContext } from "../../store/Io";

import {
  login,
  logOut,
  resetLoadingStateError,
} from "../../store/reducers/activeUserReducer";

import {
  // Forgot Password
  sendForgotPassword,
  updateForgotPassword,
  // Registration
  checkExistingRegister,
  sendRegistrationRequest,
  sendRegisterPasswordConfirm,
  // Error Setters And Reseters
  resetLoadingStateError as resetAuthLoadingError,
  resetRegistrationError,
  resetRegistrationpProccess,
  resetSuccessfullForgotPassword,
  resetSuccessfullUpdateForgotPassword,
} from "../../store/reducers/authenticationReducer";

import {
  destructureFormData,
  ValidateRegistrationInfo,
  ValidateLogin,
  ValidateConfirmRegistration,
  ValidateForgotPassword,
  ValidateUpdateForgotPassword,
  generateLowerCaseData,
} from "../../lib";

export default function useAuthenticationQuery() {
  const { socket, socket_name_placeholders } = useContext(IoContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // SECTION: Registration

  const [regError, setRegError] = useState({
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
  });

  function sendRegistrationRequestQuery(formEl) {
    const output = destructureFormData(formEl);
    const formData = {
      firstName: output.firstName,
      lastName: output.lastName,
      email: output.email,
      gender: output.gender,
      birthDate: output.birthDate,
      from: {
        country: output.countryFrom,
        city: output.cityFrom,
      },
      currentLivingPlace: {
        country: output.currCountry,
        city: output.currCity,
      },
      registrationBio: {
        institution: output.institution,
        position: output.position,
        description: output.description,
      },
    };

    const error = new ValidateRegistrationInfo(formData).init();

    if (error.error) return setRegError(error);

    dispatch(
      sendRegistrationRequest(generateLowerCaseData(formData, ["description"]))
    );
  }

  // SECTION: Confirm Registration

  const [confirmRegError, setConfirmRegError] = useState({
    hasError: false,
    message: "",
  });

  function checkExistingRegisterQuery({ requestId, tokenId }) {
    dispatch(checkExistingRegister({ requestId, tokenId }));
  }

  function sendRegisterPasswordConfirmQuery(
    form,
    isExistingRegister,
    { requestId, tokenId }
  ) {
    if (!isExistingRegister) return;

    const formData = destructureFormData(form);

    const { hasError, message } = new ValidateConfirmRegistration(
      formData
    ).validateConfirmPassword();

    if (hasError)
      return setConfirmRegError({
        hasError,
        message,
      });

    dispatch(
      sendRegisterPasswordConfirm({ requestId, tokenId, body: formData })
    );
  }

  // SECTION: Authentication

  const [loginError, setLoginError] = useState({
    error: false,
    email: {
      hasError: false,
      message: "",
    },
    password: {
      hasError: false,
      message: "",
    },
  });

  function loginQuery(e) {
    e.preventDefault();

    const loginInput = destructureFormData(e.currentTarget);

    const error = new ValidateLogin(loginInput).validateLoginForm();

    if (error.error) return setLoginError(error);

    dispatch(login(loginInput));
  }

  function logOutQuery() {
    dispatch(logOut());
    socket.emit(socket_name_placeholders.userDisconnection);
    navigate("/");
  }

  // SECTION: Forgot Password

  const [forgotPasswordError, setForgotPasswordError] = useState({
    hasError: false,
    message: "",
  });

  function sendForgotPasswordQuery(e) {
    e.preventDefault();

    const data = destructureFormData(e.currentTarget);

    const error = new ValidateForgotPassword(data).validateForgotPassword();

    if (error.hasError) return setForgotPasswordError(error);

    dispatch(sendForgotPassword(data));
  }

  const [updateForgotPasswordError, setUpdateForgotPasswordError] = useState({
    error: false,
    resetPassword: {
      hasError: false,
      message: "",
    },
    password: {
      hasError: false,
      message: "",
    },
  });

  function sendUpdateForgotPasswordQuery(e) {
    e.preventDefault();

    const data = destructureFormData(e.currentTarget);

    const error = new ValidateUpdateForgotPassword(
      data
    ).validateUpdateForgotPassword();

    if (error.error) return setUpdateForgotPasswordError(error);

    dispatch(
      updateForgotPassword({
        token: data.passwordReset,
        password: data.password,
      })
    );
  }

  // SECTION: Error Reseters
  function resetLoginErrorHandler() {
    dispatch(resetLoadingStateError());
  }

  function resetAuthLoadingErrorHandler() {
    dispatch(resetAuthLoadingError());
  }

  function cleanUpForgotPassword() {
    dispatch(resetAuthLoadingError());
    dispatch(resetSuccessfullForgotPassword());
  }

  function cleanUpUpdateForgotPassword() {
    dispatch(resetAuthLoadingError());
    dispatch(resetSuccessfullUpdateForgotPassword());
  }

  function resetRegistrationErrorHandler() {
    dispatch(resetRegistrationError());
  }

  function cleanUpRegistrationConfirm() {
    dispatch(resetRegistrationpProccess());
  }

  return {
    // Authentication
    loginError,
    setLoginError,
    loginQuery,
    logOutQuery,
    // Forgot Password
    forgotPasswordError,
    setForgotPasswordError,
    sendForgotPasswordQuery,
    updateForgotPasswordError,
    setUpdateForgotPasswordError,
    sendUpdateForgotPasswordQuery,
    // Registration
    // -> send registration request
    regError,
    setRegError,
    checkExistingRegisterQuery,
    sendRegistrationRequestQuery,
    // -> confirm registration
    confirmRegError,
    setConfirmRegError,
    sendRegisterPasswordConfirmQuery,
    // Error Setters And Reseters
    resetLoginErrorHandler,
    resetAuthLoadingErrorHandler,
    resetRegistrationErrorHandler,
    cleanUpRegistrationConfirm,
    cleanUpForgotPassword,
    cleanUpUpdateForgotPassword,
  };
}
