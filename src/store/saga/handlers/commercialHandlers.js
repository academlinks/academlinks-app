import { call, put } from "redux-saga/effects";
import { showError } from "./errorHandler";

import { setCommercials } from "../../reducers/commercialReducer";

import { getCommercialsQuery } from "../api/commercialQueries";

export function* getCommercialHandler({ payload }) {
  try {
    const { data } = yield call(getCommercialsQuery, payload);
    yield put(setCommercials(data));
  } catch (error) {
    yield showError({
      error,
      location: "getCommercialHandler",
    });
  }
}
