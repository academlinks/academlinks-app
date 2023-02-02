import { takeLatest } from "redux-saga/effects";

import { getCommercials } from "../../reducers/commercialReducer";

import { getCommercialHandler } from "../handlers/commercialHandlers";

export default function* commercialSaga() {
  yield takeLatest(getCommercials, getCommercialHandler);
}
