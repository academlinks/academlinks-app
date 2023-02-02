import { call, put } from "redux-saga/effects";
import { showError } from "./errorHandler";

import {
  getUnseenRequestsCountQuery,
  markRequestsAsSeenQuery,
  getUnseenConversationsCountQuery,
  markConversationsAsSeenQuery,
  getNotificationCountQuery,
  markNotificationsAsSeenQuery,
} from "../api/badgeQueries";

import {
  setUnseenRequestsCount,
  setResetedRequestsCount,
  setUnseenConversationsCount,
  setResetedConversationsCount,
  setUnseenNotificationsCount,
  setResetedNotificationsCount,
} from "../../reducers/badgeReducer";

export function* getUnseenRequestCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getUnseenRequestsCountQuery, userId);
    yield put(setUnseenRequestsCount(data));
  } catch (error) {
    yield showError({ error, location: "getUnseenRequestCountHandler" });
  }
}

export function* getUnseenNotificationsCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getNotificationCountQuery, userId);
    yield put(setUnseenNotificationsCount(data));
  } catch (error) {
    yield showError({ error, location: "getUnseenNotificationsCountHandler" });
  }
}

export function* getUnseenConversationsCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getUnseenConversationsCountQuery, userId);
    yield put(setUnseenConversationsCount(data));
  } catch (error) {
    yield showError({ error, location: "getUnseenConversationsCountHandler" });
  }
}

export function* markRequestsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markRequestsAsSeenQuery, userId);
    yield put(setResetedRequestsCount());
  } catch (error) {
    yield showError({ error, location: "markRequestsAsSeenHandler" });
  }
}

export function* markConversationsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markConversationsAsSeenQuery, userId);
    yield put(setResetedConversationsCount());
  } catch (error) {
    yield showError({ error, location: "markConversationsAsSeenHandler" });
  }
}

export function* markNotificationsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markNotificationsAsSeenQuery, userId);
    yield put(setResetedNotificationsCount());
  } catch (error) {
    yield showError({ error, location: "markNotificationsAsSeenHandler" });
  }
}
