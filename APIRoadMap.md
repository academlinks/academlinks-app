# CRUD'S

- [Posts Crud](#posts-crud)
  - [Create Post](#create-post)
  - [Create Blog Post](#create-blog-post) [x]
  - [Update Post](#update-post)
  - [Update Blog Post](#update-blog-post) [x]
  - [Share Post](#share-post) [x]
  - [Delete Post](#delete-post)
  - [Hide Post From Profile](#hide-post-from-profile)
  - [Remove Tag From Post](#remove-tag-from-post)
  - [Change Post Audience](#change-post-audience)
  - [Save Post](#save-post)
  - [React On Post](#react-on-post)
- [Comments Crud](#comments-crud)
  - [Add Comment](#add-comment)
  - [Delete Comment](#delete-comment)
  - [Update Comment](#update-comment)
  - [React On Comment](#react-on-comment)
  - [Pin Comment](#pin-comment)
  - [Add Comment Reply](#add-comment-reply)
  - [Delete Comment Reply](#delete-comment-reply)
  - [Update Comment Reply](#update-comment-reply)
  - [React On Comment Reply](#react-on-comment-reply)
  - [Pin Comment Reply](#pin-comment-reply)
  - [Get Post Comments](#get-post-comments)

&nbsp;

&nbsp;

# FEED

## GET USER FEED

> ### calledIn -> [Feed.jsx](./src/pages/feed/Feed.jsx)
>
> ### handledBy -> ReduxSaga --> [userReducer](./src/store/reducers/userReducer.js) - [userSaga](./src/store/saga/sagas/userSaga.js) - [userHandlers](./src/store/saga/handlers/userHandlers.js) - [userQueries](./src/store/saga/api/userQueries.js)

&nbsp;

&nbsp;

# posts-crud

## create-post

> ### calledIn -> [CreatePost.jsx](./src/components/Layouts/CreatePost/CreatePost.jsx)
>
> ### handledBy -> - [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [createPostReducer](./src/store/reducers/createPostReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

## update-post

post update process is devided as couple of steps:

- First of all we have to dispatch update process. For that coresponding function is imported into the [PostsPagePostsList.jsx](./src/components/PostsPage/components/PostsPagePostsList.jsx) and is passed as a prop into the each [Post.jsx](./src/components/Layouts/Post/Post.jsx). This function transfers coreseponding post information into the redux [portalReducer](./src/store/reducers/portalReducer.js) state

- after update action is dispatched, transfered data will be taken and used by [UpdatePostPortal.jsx](./src/components/Portal/UpdatePostPortal.jsx) and will be passed and changed by [CreatePostModal.jsx](./src/components/Layouts/CreatePost/CreatePostModal.jsx). Updated information will be saved back to redux [portalReducer](./src/store/reducers/portalReducer.js)
- after this process request will be sent
  > ### calledIn -> [UpdatePostPortal.jsx](./src/components/Portal/UpdatePostPortal.jsx)
  >
  > ### handledBy -> - [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [portalReducer](./src/store/reducers/portalReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

## delete-post

> ### calledIn -> [Post.jsx](./src/components/Layouts/Post/Post.jsx)
>
> ### handledBy -> - [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

## hide-post-from-profile

> ### calledIn -> [Post.jsx](./src/components/Layouts/Post/Post.jsx)
>
> ### handledBy -> - [useProfileReviewQuery](./src/hooks/queries/useProfileReviewQuery.js) --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

## remove-tag-from-post

> ### calledIn -> [Post.jsx](./src/components/Layouts/Post/Post.jsx)
>
> ### handledBy -> - [useProfileReviewQuery](./src/hooks/queries/useProfileReviewQuery.js) --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

## change-post-audience

> ### calledIn -> [OptionsBody.jsx](./src/components/Layouts/PostOptions/OptionsBody.jsx)
>
> ### handledBy -> - [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

## save-post

> ### calledIn -> [OptionsBody.jsx](./src/components/Layouts/PostOptions/OptionsBody.jsx)
>
> ### handledBy -> - [useSavePostQuery](./src/hooks/queries/useProfileReviewQuery.js) && [usePostQuery](./src/hooks/queries/usePostQuery.js) combination --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

## react-on-post

> ### calledIn -> [PostActions.jsx](./src/components/Layouts/PostActions/PostActions.jsx)
>
> ### handledBy -> - [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

&nbsp;

&nbsp;

# comments-crud

## add-comment

> ### calledIn -> [CommentsList.jsx](./src/components/Layouts/Comments/CommentsList.jsx)
>
> ### handledBy -> - [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## delete-comment

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> - [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## update-comment

> ### calledIn -> [CommentsList.jsx](./src/components/Layouts/Comments/CommentsList.jsx)
>
> ### handledBy -> - [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## react-on-comment

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> - [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## pin-comment

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## add-comment-reply

> ### calledIn -> [RepliesThread.jsx](./src/components/Layouts/Comments/components/RepliesThread.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## delete-comment-reply

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> - [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## update-comment-reply

> ### calledIn -> [RepliesThread.jsx](./src/components/Layouts/Comments/components/RepliesThread.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## react-on-comment-reply

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## pin-comment-reply

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

&nbsp;

## get-post-comments

> ### calledIn -> [CommentsList.jsx](./src/components/Layouts/Comments/CommentsList.jsx)
>
> ### handledBy -> - [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)
