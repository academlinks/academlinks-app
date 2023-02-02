import { useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import {
  destructurePostAuthenticData,
  destructurePostUpdateData,
  destructureSharedPostHeaderData,
} from "../../../lib/destructurers";
import { usePostQuery, useProfileReviewQuery } from "../../../hooks";
import { selectOperationalPostsLoadingState } from "../../../store/selectors/postSelectors";

import {
  PostActions,
  PostOptions,
  InlineSpinner,
  InlineStandSpinner,
  Error,
} from "../";
import styles from "./components/styles/post.module.scss";
import { SharedPostHeader } from "./components";
import PostAuthentic from "./PostAuthentic";

const CommentsList = lazy(() => import("../Comments/CommentsList"), {
  suspense: true,
});

function Post({
  data,
  activatePostMediaHandler,
  activateUpdatePostModal,
  notifyOnComment,
  className,
}) {
  const [showComments, setShowComments] = useState(
    notifyOnComment ? true : false
  );

  const { deletePostQuery, startDeletion, handleResetPostOperationalError } =
    usePostQuery();

  const { hideFromProfileQuery, removeTagQuery } = useProfileReviewQuery();

  const { loading, error, task, message } = useSelector(
    selectOperationalPostsLoadingState
  );

  return (
    <>
      <article className={`${styles.post} ${className || ""}`}>
        {startDeletion && loading === true && <InlineStandSpinner />}
        <PostOptions
          postId={data._id}
          audience={data.audience}
          deleteHandler={() => deletePostQuery(data._id)}
          updateHandler={() =>
            activateUpdatePostModal(destructurePostUpdateData(data))
          }
          removeTagHandler={() => removeTagQuery(data._id)}
          hideFromProfileHandler={() => hideFromProfileQuery(data._id)}
        />
        {data.shared && (
          <SharedPostHeader data={destructureSharedPostHeaderData(data)} />
        )}
        <PostAuthentic
          type={data.type}
          authenticType={data.authentic?.type}
          shared={data.shared}
          activatePostMediaHandler={activatePostMediaHandler}
          data={destructurePostAuthenticData(data)}
        />
        {data.type !== "blogPost" && (
          <PostActions setShowCommnents={setShowComments} data={data} />
        )}
        {showComments && (
          <Suspense fallback={<InlineSpinner />}>
            <CommentsList
              postId={data._id}
              postAuthorId={data.author._id}
              notifyOnComment={notifyOnComment}
            />
          </Suspense>
        )}
      </article>
      {error && task !== "get" && (
        <Error
          asModal={true}
          msg={message}
          onClose={handleResetPostOperationalError}
        />
      )}
    </>
  );
}

export default Post;
