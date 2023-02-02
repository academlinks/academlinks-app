import { createSelector } from "@reduxjs/toolkit";

export const selectCommercialsLeft = ({ commercials }) =>
  commercials.commercials.filter((com) => com.location.side === "left");

const selectedRight = ({ commercials }) =>
  commercials.commercials.filter((com) => com.location.side === "right");

export const selectCommercialsRight = createSelector(
  selectedRight,
  (memo) => memo
);
