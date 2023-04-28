import { call, put } from "redux-saga/effects";
import { showError } from "store/saga/handlers/errorHandler";

import { setCommercials } from "store/reducers/commercialReducer";

import { getCommercialsQuery } from "store/saga/api/commercialQueries";

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
