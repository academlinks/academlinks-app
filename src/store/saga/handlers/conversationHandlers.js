import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import {
  setConversationError,
  setAllConversations,
  setActiveConversation,
  setNewConversation,
  setDeletedConversation,
  setNewMessage,
  setMarkAsRead,
} from "../../reducers/conversationReducer";

import {
  queryGetAllConversations,
  queryGetLastConversation,
  queryGetConversation,
  queryDeleteConversation,
  sendMessageQuery,
  markAsReadQuery,
} from "../api/conversationQueries";

import { setMarkedConversation } from "../../reducers/badgeReducer";

export function* getAllConversationsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetAllConversations, userId);
    yield put(setAllConversations(data));
  } catch (error) {
    yield showError({
      error,
      location: "getAllConversationsHandler",
      setter: setConversationError,
      setterParams: {
        key: "getAllLoadingState",
        message: errorMessages.conversation.load,
      },
    });
  }
}

export function* getLastConversationHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetLastConversation, userId);
    yield put(setActiveConversation(data));
  } catch (error) {
    yield showError({
      error,
      location: "getLastConversationHandler",
      setter: setConversationError,
      setterParams: {
        key: "loadingState",
        message: errorMessages.conversation.singleConversation,
      },
    });
  }
}

export function* getConversationHandler({ payload: conversationId }) {
  try {
    const { data } = yield call(queryGetConversation, conversationId);
    yield put(setActiveConversation(data));
  } catch (error) {
    yield showError({
      error,
      location: "getConversationHandler",
      setter: setConversationError,
      setterParams: {
        key: "loadingState",
        message: errorMessages.conversation.singleConversation,
      },
    });
  }
}

export function* getNewConversationHandler({ payload: conversationId }) {
  try {
    const { data } = yield call(queryGetConversation, conversationId);
    yield put(setNewConversation(data));
  } catch (error) {
    yield showError({ error, location: "getNewConversationHandler" });
  }
}

export function* sendMessageHandler({
  payload: { adressatId, conversationId, body },
}) {
  try {
    const { data } = yield call(sendMessageQuery, {
      conversationId,
      adressatId,
      body,
    });
    yield put(setNewMessage(data));
  } catch (error) {
    yield showError({
      error,
      location: "sendMessageHandler",
      setter: setConversationError,
      setterParams: {
        key: "chatLoadingState",
        task: "send",
        message: errorMessages.conversation.send,
      },
    });
  }
}

export function* markAsReadHandler({ payload }) {
  try {
    const { data } = yield call(markAsReadQuery, payload);
    yield put(setMarkAsRead(data));
    yield put(
      setMarkedConversation({ conversationId: payload.conversationId })
    );
  } catch (error) {
    yield showError({
      error,
      location: "markAsReadHandler",
      setter: setConversationError,
      setterParams: {
        key: "chatLoadingState",
        task: "mark",
        message: errorMessages.conversation.operation,
      },
    });
  }
}

export function* deleteConversationHandler({ payload: conversationId }) {
  try {
    yield call(queryDeleteConversation, conversationId);
    yield put(setDeletedConversation(conversationId));
  } catch (error) {
    yield showError({
      error,
      location: "deleteConversationHandler",
      setter: setConversationError,
      setterParams: {
        key: "chatLoadingState",
        task: "deletion",
        message: errorMessages.conversation.deletion,
      },
    });
  }
}
