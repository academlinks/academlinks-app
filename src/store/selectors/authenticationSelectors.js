export const selectAuthLoadingState = ({ authentication }) =>
  authentication.loadingState;

export const selectRegistrationLoadingState = ({ authentication }) =>
  authentication.registerLoadingState;

// existing registration request
export const selectIsExistingRequestAndSuccessMessage = ({
  authentication,
}) => ({
  isExistingRegister: authentication.isExistingRegister,
  successfullRegistration: authentication.successfullRegistration,
});

export const selectSentRegistrationStatus = ({ authentication }) =>
  authentication.registrationSuccessfullySent;

export const selectResetPasswordIsSuccessfullySet = ({ authentication }) =>
  authentication.resetPasswordIsSuccessfullySet;

export const selectPasswordIsSuccessfullyUpdated = ({ authentication }) =>
  authentication.passwordIsSuccessfullyUpdated;
