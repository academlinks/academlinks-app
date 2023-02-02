import { takeLatest } from "redux-saga/effects";

import {
  getUnseenRequestsCount,
  resetUnseenRequestsCount,
  getUnseenConversationsCount,
  resetUnseenConversationsCount,
  getUnseenNotificationsCount,
  resetUnseenNotificationsCount,
} from "../../reducers/badgeReducer";

import {
  getUnseenRequestCountHandler,
  markRequestsAsSeenHandler,
  getUnseenConversationsCountHandler,
  markConversationsAsSeenHandler,
  getUnseenNotificationsCountHandler,
  markNotificationsAsSeenHandler,
} from "../handlers/badgeHandlers";

export default function* badgeSaga() {
  yield takeLatest(getUnseenRequestsCount, getUnseenRequestCountHandler);
  yield takeLatest(resetUnseenRequestsCount, markRequestsAsSeenHandler);
  yield takeLatest(
    getUnseenConversationsCount,
    getUnseenConversationsCountHandler
  );
  yield takeLatest(
    resetUnseenConversationsCount,
    markConversationsAsSeenHandler
  );
  yield takeLatest(
    getUnseenNotificationsCount,
    getUnseenNotificationsCountHandler
  );
  yield takeLatest(
    resetUnseenNotificationsCount,
    markNotificationsAsSeenHandler
  );
}
