import { createSlice } from "@reduxjs/toolkit";

function updateUpdateState({ state, loading = true, error = false, message }) {
  state.updateState.loading = loading;
  state.updateState.error = error;
  state.updateState.message = error ? message : "";
}

const initialState = {
  target: "",
  editableTarget: "",
  isEditing: false,
  headingTitle: "",

  loadingState: {
    loading: false,
    error: false,
    message: "",
  },

  updateState: {
    loading: false,
    error: false,
    message: "",
  },

  userInfo: {
    _id: "",
    email: "",
    createdAt: "",
    birthDate: "",
    gender: "",
    workplace: [],
    education: [],
    from: {
      country: "",
      city: "",
    },
    currentLivingPlace: {
      country: "",
      city: "",
    },
    currentWorkplace: {
      institution: "",
      position: "",
      description: "",
    },
  },

  // updateables
  updateables: {
    birthDate: {
      birthDate: "",
    },

    birthPlace: {
      country: "",
      city: "",
    },

    livingPlace: {
      country: "",
      city: "",
    },

    education: {
      collage: "",
      faculty: "",
      degree: "",
      description: "",
      years: {
        from: "",
        to: "",
      },
    },

    workplace: {
      company: "",
      position: "",
      description: "",
      workingYears: {
        from: "",
        to: "",
      },
    },

    currentWorkplace: {
      institution: "",
      position: "",
      description: "",
    },
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTarget(state, { payload }) {
      state.target = payload.key;
      state.headingTitle = payload.label;
      state.editableTarget = "";
      state.isEditing = false;
    },

    resetTarget(state) {
      state.target = "";
      state.headingTitle = "";
    },

    setIsEditing(state, { payload }) {
      state.editableTarget = payload.key;
      state.headingTitle = `update ${payload.label}`;
      state.isEditing = true;
    },

    resetIsEditing(state) {
      state.editableTarget = "";
      state.isEditing = false;

      const existingTitle = state.headingTitle;
      state.headingTitle = existingTitle.replace(/update|add/, () => "");
    },

    // db
    setUpdateError(state, { payload }) {
      updateUpdateState({
        state,
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    // resetUpdateError(state) {
    //   updateUpdateState({ state, loading: false });
    // },

    setLoadingError(state, { payload }) {
      state.loadingState.loading = false;
      state.loadingState.error = true;
      state.loadingState.message = payload.message;
    },

    getUserInfo(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setUserInfo(state, { payload }) {
      state.userInfo = payload;
      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    addUserInfo(state, { payload }) {
      updateUpdateState({ state });
    },

    updateUserNestedInfo(state) {
      updateUpdateState({ state });
    },

    setUserInfoFragment(state, { payload }) {
      const { field, data } = payload;
      if (
        [
          "from",
          "currentLivingPlace",
          "birthDate",
          "education",
          "workplace",
          "currentWorkplace",
        ].includes(field)
      )
        state.userInfo[field] = data;

      updateUpdateState({ state, loading: false });

      state.isEditing = false;
      state.editableTarget = "";
    },

    deleteUserInfo(state, { payload }) {},

    setDeletedUserInfo(state, { payload }) {
      const { field } = payload;
      state.userInfo[field] = "";
    },

    deleteNestedUserInfo(state, { payload }) {},

    ////////////////////////////
    // updateables user info //
    //////////////////////////
    updateBirthdate(state, { payload }) {
      state.updateables.birthDate = payload;
    },

    resetBirthdate(state) {
      state.updateables.birthDate = initialState.userInfo.birthDate;
    },

    updateBirthplace(state, { payload }) {
      state.updateables.birthPlace = payload;
    },

    resetBirthplace(state) {
      state.updateables.birthPlace = initialState.userInfo.from;
    },

    updateLivingPlace(state, { payload }) {
      state.updateables.livingPlace = payload;
    },

    resetLivingPlace(state) {
      state.updateables.livingPlace = initialState.userInfo.currentLivingPlace;
    },

    updateEducation(state, { payload }) {
      state.updateables.education = payload;
    },

    resetEducation(state) {
      state.updateables.education = initialState.userInfo.education;
    },

    updateWorkplace(state, { payload }) {
      state.updateables.workplace = payload;
    },

    resetWorkplace(state) {
      state.updateables.workplace = initialState.userInfo.workplace;
    },

    updateCurrentWorkplace(state, { payload }) {
      state.updateables.currentWorkplace = payload;
    },

    resetCurrentWorkplace(state) {
      state.updateables.currentWorkplace =
        initialState.userInfo.currentWorkplace;
    },

    ////////// user email and password
    updatePassword(state) {
      updateUpdateState({ state });
    },

    setUpdatedPassword(state, { payload }) {
      localStorage.setItem(
        "academind_passport",
        JSON.stringify(payload.accessToken)
      );

      updateUpdateState({ state, loading: false });

      state.isEditing = false;
      state.editableTarget = "";
    },

    updateEmail(state) {
      updateUpdateState({ state });
    },

    setUpdatedEmail(state, { payload }) {
      localStorage.setItem(
        "academind_passport",
        JSON.stringify(payload.accessToken)
      );

      state.userInfo.email = payload.email;

      updateUpdateState({ state, loading: false });

      state.isEditing = false;
      state.editableTarget = "";
    },
  },
});

export default settingsSlice.reducer;
export const {
  setTarget,
  setIsEditing,
  resetIsEditing,
  resetTarget,
  // db
  setUpdateError,
  setLoadingError,
  getUserInfo,
  setUserInfo,
  setUserInfoFragment,
  addUserInfo,
  updateUserNestedInfo,
  deleteUserInfo,
  setDeletedUserInfo,
  deleteNestedUserInfo,
  // updateablse
  updateBirthdate,
  resetBirthdate,
  updateBirthplace,
  resetBirthplace,
  updateLivingPlace,
  resetLivingPlace,
  updateEducation,
  resetEducation,
  updateWorkplace,
  resetWorkplace,
  updateCurrentWorkplace,
  resetCurrentWorkplace,
  updatePassword,
  setUpdatedPassword,
  updateEmail,
  setUpdatedEmail,
} = settingsSlice.actions;
