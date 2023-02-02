import { axiosQuery } from "../../axiosConfig";

export async function queryPostComments(postId) {
  return await axiosQuery(`/posts/${postId}/comments`);
}

export async function queryAddComment({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}/comments`, body);
}

export async function queryAddCommentReply({ commentId, body }) {
  return await axiosQuery.post(`/comments/${commentId}/reply`, body);
}

export async function queryDeleteComment(commentId) {
  return await axiosQuery.delete(`/comments/${commentId}`);
}

export async function queryDeleteCommentReply({ commentId, replyId }) {
  return await axiosQuery.delete(`/comments/${commentId}/reply/${replyId}`);
}

export async function queryUpdateComment({ commentId, body }) {
  return await axiosQuery.patch(`/comments/${commentId}`, body);
}

export async function queryUpdateCommentReply({ commentId, replyId, body }) {
  return await axiosQuery.patch(
    `/comments/${commentId}/reply/${replyId}`,
    body
  );
}

export async function queryReactionOnComment(commentId) {
  return await axiosQuery.patch(`/comments/${commentId}/reaction`);
}

export async function queryReactionOnCommentReply({ commentId, replyId }) {
  return await axiosQuery.patch(
    `/comments/${commentId}/reply/${replyId}/reaction`
  );
}

export async function queryPinComment(commentId) {
  return await axiosQuery.patch(`/comments/${commentId}/pin`);
}

export async function queryPinCommentReply({ commentId, replyId }) {
  return await axiosQuery.patch(`/comments/${commentId}/reply/${replyId}/pin`);
}
