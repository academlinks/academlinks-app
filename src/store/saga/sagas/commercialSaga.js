import { takeLatest } from "redux-saga/effects";

import { getCommercials } from "store/reducers/commercialReducer";

import { getCommercialHandler } from "store/saga/handlers/commercialHandlers";

export default function* commercialSaga() {
  yield takeLatest(getCommercials, getCommercialHandler);
}
