import { takeLatest } from "redux-saga/effects";

import {
  addComment,
  deleteComment,
  updateComment,
  reactOnComment,
  pinComment,
  addCommentReply,
  deleteCommentReply,
  updateCommentReply,
  reactOnCommentReply,
  pinCommentReply,
  getPostComments,
} from "../../reducers/commentsDataReducer";

import {
  getPostsCommentsHandler,
  addCommentHandler,
  addCommentReplyHandler,
  deleteCommentHandler,
  deleteCommentReplyHandler,
  updateCommentHandler,
  updateCommentReplyHandler,
  reactOnCommentHandler,
  reactOnCommentReplyHandler,
  pinCommentHandler,
  pinCommentReplyHandler,
} from "../handlers/commentsHandlers";

export default function* commentsSaga() {
  yield takeLatest(getPostComments, getPostsCommentsHandler);
  yield takeLatest(addComment, addCommentHandler);
  yield takeLatest(addCommentReply, addCommentReplyHandler);
  yield takeLatest(deleteComment, deleteCommentHandler);
  yield takeLatest(deleteCommentReply, deleteCommentReplyHandler);
  yield takeLatest(updateComment, updateCommentHandler);
  yield takeLatest(updateCommentReply, updateCommentReplyHandler);
  yield takeLatest(reactOnComment, reactOnCommentHandler);
  yield takeLatest(reactOnCommentReply, reactOnCommentReplyHandler);
  yield takeLatest(pinComment, pinCommentHandler);
  yield takeLatest(pinCommentReply, pinCommentReplyHandler);
}
