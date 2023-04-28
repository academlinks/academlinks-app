import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ValidateUserInfo } from "lib/Validators";
import { destructureFormData, generateLowerCaseData } from "lib";

import {
  addUserInfo,
  updateUserNestedInfo,
  deleteUserInfo,
  deleteNestedUserInfo,
  getUserInfo,
  updatePassword,
  updateEmail,
} from "store/reducers/settingsReducer";

import { selectActiveUserId } from "store/selectors/activeUserSelectors";
import { deleteAccount } from "store/reducers/activeUserReducer";

export default function useSettingsQuery() {
  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);

  // main queries which are called in callback by other functions to CRUD UserInfo
  function addUserInfoQuery({ field, data }) {
    const body = { [field]: data };
    dispatch(addUserInfo({ body, userId: activeUserId, field }));
  }

  function updateNestedUserInfoQuery({ field, docId, data }) {
    dispatch(
      updateUserNestedInfo({ userId: activeUserId, field, docId, data })
    );
  }

  function deleteUserInfoQuery({ field }) {
    dispatch(deleteUserInfo({ userId: activeUserId, field }));
  }

  function deleteUserNestedInfoQuery({ field, docId }) {
    dispatch(deleteNestedUserInfo({ userId: activeUserId, field, docId }));
  }

  /////////////////////////////////////////////////
  // Get And Update UserInfo
  function getUserInfoQuery(userId) {
    dispatch(getUserInfo(userId));
  }

  const [birthDateError, setBirthDateError] = useState({
    error: false,
    message: "",
  });

  function addBirthDateQuery({ data }) {
    const { birthDateError } = new ValidateUserInfo(data).validateBirthdate();

    if (birthDateError.error) return setBirthDateError(birthDateError);

    addUserInfoQuery({ field: "birthDate", data });
  }

  const [livingPlaceError, setLivingPlaceError] = useState({
    error: false,
    city: {
      hasError: false,
      message: "",
    },
    country: {
      hasError: false,
      message: "",
    },
  });

  function addBirthPlaceQuery(e) {
    e.preventDefault();

    const output = destructureFormData(e.currentTarget);

    const { livingPlaceError } = new ValidateUserInfo(
      output
    ).validateLivingplace();

    if (livingPlaceError.error) return setLivingPlaceError(livingPlaceError);

    addUserInfoQuery({
      field: "from",
      data: generateLowerCaseData(output),
    });
  }

  function addLivingPlaceQuery(e) {
    e.preventDefault();

    const output = destructureFormData(e.currentTarget);

    const { livingPlaceError } = new ValidateUserInfo(
      output
    ).validateLivingplace();

    if (livingPlaceError.error) return setLivingPlaceError(livingPlaceError);

    addUserInfoQuery({
      field: "currentLivingPlace",
      data: generateLowerCaseData(output),
    });
  }

  const [educationError, setEducationError] = useState({
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
  });

  function addEducationQuery({ operation, docId, formData }) {
    const output = destructureFormData(formData);

    const data = {
      collage: output.collage,
      faculty: output.faculty,
      degree: output.degree,
      description: output.description,
      years: {
        from: output.dateFrom,
        to: output.dateTo,
      },
    };

    const { educationError } = new ValidateUserInfo(data).validateEducation();

    if (educationError.error) return setEducationError(educationError);

    if (operation === "add")
      addUserInfoQuery({
        field: "education",
        data: generateLowerCaseData(data, ["description"]),
      });
    else if (operation === "update")
      updateNestedUserInfoQuery({
        field: "education",
        data: generateLowerCaseData(data, ["description"]),
        docId,
      });
  }

  const [workplaceError, setWorkplaceError] = useState({
    error: false,
    institution: {
      hasError: false,
      message: "",
    },

    position: {
      hasError: false,
      message: "",
    },
  });

  function addWorkplaceQuery({ operation, docId, formData }) {
    const output = destructureFormData(formData);

    const data = {
      institution: output.institution,
      position: output.position,
      description: output.description,
      workingYears: {
        from: output.dateFrom,
        to: output.dateTo,
      },
    };

    const { workPlaceError: workPlcError } = new ValidateUserInfo(
      data
    ).validateWorkplace();

    if (workPlcError.error) return setWorkplaceError(workPlcError);

    if (operation === "add")
      addUserInfoQuery({
        field: "workplace",
        data: generateLowerCaseData(data, ["description"]),
      });
    else if (operation === "update")
      updateNestedUserInfoQuery({
        field: "workplace",
        data: generateLowerCaseData(data, ["description"]),
        docId,
      });
  }

  const [currentWorkPlaceError, setCurrentWorkPlaceError] = useState({
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
  });

  function updateCurrentWorkplaceQuery(e) {
    e.preventDefault();

    const output = destructureFormData(e.currentTarget);

    const { currentWorkPlaceError: currWorkplaceError } = new ValidateUserInfo(
      output
    ).validateCurrentWorkplace();

    if (currWorkplaceError.error)
      return setCurrentWorkPlaceError(currWorkplaceError);

    addUserInfoQuery({
      field: "currentWorkplace",
      data: generateLowerCaseData(output, ["description"]),
    });
  }

  //////////////////////
  // Password And Email

  const [passwordError, setPasswordError] = useState({
    error: false,
    currentPassword: {
      hasError: false,
      message: "",
    },
    newPassword: {
      hasError: false,
      message: "",
    },
  });

  function updatePasswordQuery(e) {
    e.preventDefault();

    const output = destructureFormData(e.currentTarget);

    const { passwordError: passError } = new ValidateUserInfo(
      output
    ).validatePassword();

    if (passError.error) return setPasswordError(passError);

    dispatch(
      updatePassword({
        userId: activeUserId,
        body: output,
      })
    );
  }

  const [emailError, setEmailError] = useState({
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
  });

  function updateEmailQuery(e) {
    e.preventDefault();

    const output = destructureFormData(e.currentTarget);

    const { emailError: changeEmailError } = new ValidateUserInfo(
      output
    ).validateEmail();

    if (changeEmailError.error) return setEmailError(changeEmailError);

    dispatch(
      updateEmail({
        userId: activeUserId,
        body: generateLowerCaseData(output),
      })
    );
  }

  /////////////////
  // Delete Account

  function deleteAccountQuery(e) {
    e.preventDefault();
    const output = destructureFormData(e.currentTarget);

    dispatch(deleteAccount({ userId: activeUserId, data: output }));
  }

  return {
    deleteUserInfoQuery,
    deleteUserNestedInfoQuery,
    /////////////////////
    getUserInfoQuery,
    addBirthPlaceQuery,
    addBirthDateQuery,
    addLivingPlaceQuery,
    addEducationQuery,
    addWorkplaceQuery,
    updatePasswordQuery,
    updateEmailQuery,
    updateCurrentWorkplaceQuery,
    deleteAccountQuery,
    //// errors ////
    birthDateError,
    livingPlaceError,
    setLivingPlaceError,
    educationError,
    setEducationError,
    currentWorkPlaceError,
    setCurrentWorkPlaceError,
    workplaceError,
    setWorkplaceError,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
  };
}
