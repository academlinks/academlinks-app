import { createSlice } from "@reduxjs/toolkit";

function updateLoadingState({
  state,
  loading,
  message,
  error = false,
  target,
  task,
}) {
  state.loadingState.loading = loading;
  state.loadingState.error = error ? true : false;
  state.loadingState.target = error ? target : "";
  state.loadingState.message = error ? message : "";
  state.loadingState.task = error ? task : "";
}

function resetLoadingState({ state, loading = false }) {
  state.loadingState.loading = loading;
  state.loadingState.error = false;
  state.loadingState.target = "";
  state.loadingState.message = "";
  state.loadingState.task = "";
}

const commentsDataSlice = createSlice({
  name: "CommentsData",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
      target: "", // could be "global" | "parent" | "reply"
      task: "", // could be "get" | "add" | "update" | "deletion" |  "pin"
    },
    comments: [],
  },
  reducers: {
    setCommentsError(state, { payload }) {
      updateLoadingState({
        state,
        loading: false,
        error: true,
        message: payload.message,
        target: payload.target,
        task: payload.task,
      });
    },

    getPostComments(state) {
      resetLoadingState({ state, loading: true });
    },

    setPostComments(state, { payload }) {
      const { postId, data } = payload;

      const existingCommentsBockIndex = state.comments.findIndex(
        (block) => block.postId === postId
      );

      if (existingCommentsBockIndex >= 0)
        state.comments[existingCommentsBockIndex].comments = data;
      else state.comments = [...state.comments, { postId, comments: data }];

      updateLoadingState({ state, loading: false });
    },

    addComment(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setNewComment(state, { payload }) {
      const { postId, data } = payload;
      const i = state.comments.findIndex(
        (commentBlock) => commentBlock.postId === postId
      );
      if (i >= 0)
        state.comments[i].comments = [...state.comments[i].comments, data];
      else state.comments.push({ postId, comments: [data] });
    },

    addCommentReply(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setNewCommentReply(state, { payload }) {
      const { params, data } = payload;

      const parentComment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments?.find((comment) => comment._id === params.commentId);

      parentComment.replies.push(data);
      parentComment.repliesAmount = parentComment.repliesAmount += 1;
    },

    deleteComment(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setDeletedComment(state, { payload }) {
      const { params } = payload;

      const commentsBlock = state.comments.find(
        (commentBlock) => commentBlock.postId === params.postId
      );

      commentsBlock.comments = commentsBlock.comments?.filter(
        (comment) => comment._id !== params.commentId
      );

      if (!commentsBlock.comments[0])
        state.comments = state.comments.filter(
          (block) => block.postId !== commentsBlock.postId
        );
    },

    deleteCommentReply(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setDeletedCommentReply(state, { payload }) {
      const { params } = payload;

      const parentComment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments?.find((comment) => comment._id === params.commentId);

      parentComment.replies = parentComment.replies.filter(
        (reply) => reply._id !== params.replyId
      );
      parentComment.repliesAmount = parentComment.repliesAmount -= 1;
    },

    updateComment(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setUpdatedComment(state, { payload }) {
      const { params, data } = payload;
      const comment = state.comments
        .find((commentsBlock) => commentsBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      comment.text = data.text;
      comment.tags = data.tags;
    },

    updateCommentReply(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setUpdatedCommentReply(state, { payload }) {
      const { params, data } = payload;
      const comment = state.comments
        .find((commentsBlock) => commentsBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      const i = comment.replies.findIndex(
        (reply) => reply._id === params.replyId
      );
      comment.replies[i].text = data.text;
      comment.replies[i].tags = data.tags;
    },

    reactOnComment() {},

    setReactionOnComment(state, { payload }) {
      const { params, data } = payload;

      const comment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      comment.likesAmount = data.likesAmount;
      comment.reactions = data.reactions;
    },

    reactOnCommentReply() {},

    setReactionOnCommentReply(state, { payload }) {
      const { params, data } = payload;

      const commentReply = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId)
        .replies.find((reply) => reply._id === params.replyId);

      commentReply.likesAmount = data.likesAmount;
      commentReply.reactions = data.reactions;
    },

    pinComment(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setPinnedComment(state, { payload }) {
      const { params, data } = payload;

      const comment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      comment.pin = data.pin;
    },

    pinCommentReply(state) {
      if (state.loadingState.error) resetLoadingState({ state });
    },

    setPinnedCommentReply(state, { payload }) {
      const { params, data } = payload;

      const commentReply = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId)
        .replies.find((reply) => reply._id === params.replyId);

      commentReply.pin = data.pin;
    },

    resetComments(state) {
      state.comments = [];
      resetLoadingState({ state });
    },
  },
});

export default commentsDataSlice.reducer;
export const {
  setCommentsError,
  getPostComments,
  setPostComments,
  addComment,
  setNewComment,
  addCommentReply,
  setNewCommentReply,
  deleteComment,
  setDeletedComment,
  deleteCommentReply,
  setDeletedCommentReply,
  updateComment,
  setUpdatedComment,
  updateCommentReply,
  setUpdatedCommentReply,
  reactOnComment,
  setReactionOnComment,
  reactOnCommentReply,
  setReactionOnCommentReply,
  pinComment,
  setPinnedComment,
  pinCommentReply,
  setPinnedCommentReply,
  resetComments,
} = commentsDataSlice.actions;
