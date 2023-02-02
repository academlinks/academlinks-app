import { takeLatest, takeEvery } from "redux-saga/effects";

import {
  getAllConversations,
  getLastConversation,
  getConversation,
  deleteConversation,
  sendMessage,
  markAsRead,
  getNewConversation,
} from "../../reducers/conversationReducer";

import {
  getAllConversationsHandler,
  getConversationHandler,
  getNewConversationHandler,
  getLastConversationHandler,
  deleteConversationHandler,
  sendMessageHandler,
  markAsReadHandler,
} from "../handlers/conversationHandlers";

export default function* converastionSaga() {
  yield takeLatest(getAllConversations, getAllConversationsHandler);
  yield takeLatest(getLastConversation, getLastConversationHandler);
  yield takeLatest(getConversation, getConversationHandler);
  yield takeEvery(getNewConversation, getNewConversationHandler);
  yield takeLatest(deleteConversation, deleteConversationHandler);
  yield takeEvery(sendMessage, sendMessageHandler);
  yield takeLatest(markAsRead, markAsReadHandler);
}
