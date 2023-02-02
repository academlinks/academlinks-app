import { all, call, put, select } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import {
  setCommentsError,
  setPostComments,
  setNewComment,
  setNewCommentReply,
  setDeletedComment,
  setDeletedCommentReply,
  setUpdatedComment,
  setUpdatedCommentReply,
  setReactionOnComment,
  setReactionOnCommentReply,
  setPinnedComment,
  setPinnedCommentReply,
} from "../../reducers/commentsDataReducer";

import {
  queryPostComments,
  queryAddComment,
  queryAddCommentReply,
  queryDeleteComment,
  queryDeleteCommentReply,
  queryUpdateComment,
  queryUpdateCommentReply,
  queryReactionOnComment,
  queryReactionOnCommentReply,
  queryPinComment,
  queryPinCommentReply,
} from "../api/commentsQueries";

import {
  encreasePostCommentCount,
  decreasePostCommentCount,
} from "../../reducers/postsDataReducer";

export function* getPostsCommentsHandler({ payload: postId }) {
  try {
    const { data } = yield call(queryPostComments, postId);
    yield put(setPostComments({ postId, data }));
  } catch (error) {
    yield showError({
      error,
      location: "getPostsCommentsHandler",
      setter: setCommentsError,
      setterParams: {
        target: "global",
        task: "get",
        message: errorMessages.comments.load,
      },
    });
  }
}

export function* addCommentHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(queryAddComment, { postId, body });
    yield all([
      put(setNewComment({ postId, data })),
      put(encreasePostCommentCount(postId)),
    ]);
  } catch (error) {
    yield showError({
      error,
      location: "addCommentHandler",
      setter: setCommentsError,
      setterParams: {
        target: "parent",
        task: "add",
        message: errorMessages.comments.add,
      },
    });
  }
}

export function* addCommentReplyHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryAddCommentReply, {
      commentId: params.commentId,
      body,
    });
    yield all([
      put(setNewCommentReply({ params, data })),
      put(encreasePostCommentCount(params.postId)),
    ]);
  } catch (error) {
    yield showError({
      error,
      location: "addCommentReplyHandler",
      setter: setCommentsError,
      setterParams: {
        target: "reply",
        task: "add",
        message: errorMessages.comments.addReply,
      },
    });
  }
}

export function* deleteCommentHandler({ payload: params }) {
  try {
    const deletedCommentCount = yield select(
      (state) =>
        state.commentsData.comments
          .find((commentsBlock) => commentsBlock.postId === params.postId)
          .comments.find((comment) => comment._id === params.commentId)
          .repliesAmount
    );

    yield call(queryDeleteComment, params.commentId);

    yield all([
      put(setDeletedComment({ params })),
      put(
        decreasePostCommentCount({ postId: params.postId, deletedCommentCount })
      ),
    ]);
  } catch (error) {
    yield showError({
      error,
      location: "deleteCommentHandler",
      setter: setCommentsError,
      setterParams: {
        target: "parent",
        task: "deletion",
        message: errorMessages.comments.deletion,
      },
    });
  }
}

export function* deleteCommentReplyHandler({ payload: params }) {
  try {
    yield call(queryDeleteCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
    });

    yield all([
      put(setDeletedCommentReply({ params })),
      put(decreasePostCommentCount({ postId: params.postId })),
    ]);
  } catch (error) {
    yield showError({
      error,
      location: "deleteCommentReplyHandler",
      setter: setCommentsError,
      setterParams: {
        target: "reply",
        task: "deletion",
        message: errorMessages.comments.deletionReply,
      },
    });
  }
}

export function* updateCommentHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdateComment, {
      commentId: params.commentId,
      body,
    });
    yield put(setUpdatedComment({ params, data }));
  } catch (error) {
    yield showError({
      error,
      location: "updateCommentHandler",
      setter: setCommentsError,
      setterParams: {
        target: "parent",
        task: "update",
        message: errorMessages.comments.update,
      },
    });
  }
}

export function* updateCommentReplyHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdateCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
      body,
    });
    yield put(setUpdatedCommentReply({ params, data }));
  } catch (error) {
    yield showError({
      error,
      location: "updateCommentReplyHandler",
      setter: setCommentsError,
      setterParams: {
        target: "reply",
        task: "update",
        message: errorMessages.comments.updateReply,
      },
    });
  }
}

export function* reactOnCommentHandler({ payload: params }) {
  try {
    const { data } = yield call(queryReactionOnComment, params.commentId);
    yield put(setReactionOnComment({ params, data }));
  } catch (error) {
    yield showError({ error, location: "reactOnCommentHandler" });
  }
}

export function* reactOnCommentReplyHandler({ payload: params }) {
  try {
    const { data } = yield call(queryReactionOnCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
    });
    yield put(setReactionOnCommentReply({ params, data }));
  } catch (error) {
    yield showError({ error, location: "reactOnCommentReplyHandler" });
  }
}

export function* pinCommentHandler({ payload: params }) {
  try {
    const { data } = yield call(queryPinComment, params.commentId);
    yield put(setPinnedComment({ params, data }));
  } catch (error) {
    yield showError({
      error,
      location: "pinCommentHandler",
      setter: setCommentsError,
      setterParams: {
        target: "parent",
        task: "pin",
        message: errorMessages.comments.pin,
      },
    });
  }
}

export function* pinCommentReplyHandler({ payload: params }) {
  try {
    const { data } = yield call(queryPinCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
    });
    yield put(setPinnedCommentReply({ params, data }));
  } catch (error) {
    yield showError({
      error,
      location: "pinCommentReplyHandler",
      setter: setCommentsError,
      setterParams: {
        target: "reply",
        task: "pin",
        message: errorMessages.comments.pinReply,
      },
    });
  }
}
