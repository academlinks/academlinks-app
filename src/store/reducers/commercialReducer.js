import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commercials: [],
};

const commercialSlice = createSlice({
  name: "commercial",
  initialState,
  reducers: {
    getCommercials() {},

    setCommercials(state, { payload }) {
      state.commercials = payload;
    },

    resetCommercials(state) {
      state.commercials = [];
    },
  },
});

export default commercialSlice.reducer;
export const { getCommercials, setCommercials, resetCommercials } =
  commercialSlice.actions;
