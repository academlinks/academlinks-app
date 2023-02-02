import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    data: null,
  },
  reducers: {
    //////////////////////////////////
    //////////// DATA ///////////////
    ////////////////////////////////
    getUserAboutData(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setUserAboutData(state, { payload }) {
      state.data = payload;

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = payload.message;
    },

    resetData(state) {
      state.data = null;
    },

    setAboutError(state, { payload }) {
      state.loadingState.loading = false;
      state.loadingState.error = true;
      state.loadingState.message = payload.message;
    },
  },
});

export default aboutSlice.reducer;
export const { getUserAboutData, setUserAboutData, resetData, setAboutError } =
  aboutSlice.actions;
