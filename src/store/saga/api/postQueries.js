import { axiosQuery, axiosFormDataQuery } from "../../axiosConfig";

// SECTION: ========== 1.0) CREATE UPADATE SHARE ==========

export async function queryCreatePost(body) {
  return await axiosFormDataQuery.post(`/posts`, body);
}

export async function queryUpdatePost({ postId, body }) {
  return await axiosFormDataQuery.patch(`/posts/${postId}`, body);
}

export async function querySharePost({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}`, body);
}

// SECTION: ========== 2.0) User Related ==========

export async function queryGetUserProfilePosts(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/profile/posts?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

export async function queryGetUserFeed(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/feed?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

// SECTION: ======= 3.0) BlogPosts ======== //

export async function queryBlogPosts(page, limit, hasMore, query) {
  return await axiosQuery(
    `/posts/blogPosts?page=${page}&limit=${limit}&hasMore=${hasMore}${query}`
  );
}

export async function queryTopRatedBlogPosts(limit) {
  return await axiosQuery(`/posts/blogPosts/topRated?limit=${limit}`);
}

export async function queryTopRatedPublishers(limit) {
  return await axiosQuery(`/posts/blogPosts/topRatedPublishers?limit=${limit}`);
}

export async function queryRelatedPosts(postId, limit) {
  return await axiosQuery(
    `/posts/blogPosts/relatedPosts/${postId}?limit=${limit}`
  );
}

// SECTION: ======= 4.0) Profile-Review ======== //

export async function queryGetPendingPosts(userId) {
  return await axiosQuery(`/user/${userId}/profile/pending-posts`);
}

export async function queryGetHiddenPosts(userId) {
  return await axiosQuery(`/user/${userId}/profile/hidden-posts`);
}

export async function queryHidePostFromProfile(postId) {
  return await axiosQuery.patch(`/posts/${postId}/hide-post`);
}

export async function queryRemoveTagOnPost(postId) {
  return await axiosQuery.delete(`/posts/${postId}/tag`);
}

export async function queryShowPostOnProfile(postId, body) {
  return await axiosQuery.patch(`/posts/${postId}/aprove-post`, body);
}

export async function queryAddPostToProfile(postId) {
  return await axiosQuery.patch(`/posts/${postId}/show-post`);
}

// SECTION: ======= 5.0) Bookmarks ======== //

export async function queryGetBookmarks(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/profile/bookmarks?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

export async function querySavePost(postId) {
  return await axiosQuery.post(`/posts/${postId}/bookmark`);
}

// SECTION: ======= 6.0) Post CRUD'S ======== //

export async function queryDeletePost(postId) {
  return await axiosQuery.delete(`/posts/${postId}`);
}

export async function queryChangePostAudience({ postId, body }) {
  return await axiosQuery.patch(`/posts/${postId}/audience`, body);
}

export async function queryPostReaction({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}/reaction`, body);
}

// SECTION: ======= 7.0) Global Setters And Getters ======== //

export async function queryGetPost(postId) {
  return await axiosQuery(`/posts/${postId}`);
}
