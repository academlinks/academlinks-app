export const selectSettingsStatus = ({ settings }) => ({
  target: settings.target,
  editableTarget: settings.editableTarget,
  isEditing: settings.isEditing,
  headingTitle: settings.headingTitle,
  loadingState: settings.loadingState,
});

export const selectUpdateableBirthDate = ({ settings }) => ({
  birthDate: settings.updateables.birthDate,
  updateState: settings.updateState,
});

export const selectUpdateableBirthPlace = ({ settings }) => ({
  birthPlace: settings.updateables.birthPlace,
  updateState: settings.updateState,
});

export const selectUpdateableLivingPlace = ({ settings }) => ({
  livingPlace: settings.updateables.livingPlace,
  updateState: settings.updateState,
});

export const selectUpdateableEducation = ({ settings }) => ({
  education: settings.updateables.education,
  updateState: settings.updateState,
});

export const selectUpdateableWorkplace = ({ settings }) => ({
  workplace: settings.updateables.workplace,
  updateState: settings.updateState,
});

export const selectUpdateableCurrentWorkplace = ({ settings }) => ({
  currentWorkplace: settings.updateables.currentWorkplace,
  updateState: settings.updateState,
});

export const selectUpdateableStatus = ({ settings }) => settings.updateState;
