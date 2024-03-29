import { useSelector } from "react-redux";

import { usePost } from "hooks/layoutBased";
import { usePostQuery } from "hooks/queries";
import { useIsAuthenticatedUser } from "hooks/auth";
import { destructurePostShareData } from "lib/destructurers";
import { selectActiveUserId } from "store/selectors/activeUserSelectors";

import { ReactionBTN, CommentBTN, ShareBTN } from "./components";
import styles from "./components/postActions.module.scss";

/**
 * is user in Post component as well as BlogPost component
 * like, dislike, share and comment buttons.
 * @param {*}
 * @param {*} setShowCommnents attached on comment button and sets as !prevState
 * @param {*} data object of data {_id,type,userName,userImg,createdAt,description,media, authenticDescription,commentsCount,article,title}. this information will be send to redux portalReducer when user clicks share button
 * @param {boolean} redirect basically this prop is for BlogPost on The Blog Feed. if redirect is true and user clicks on comment button user will be redirected through the ActiveBlogPost
 * @returns
 */
function PostActions({ className, setShowCommnents, data, redirect }) {
  const activeUserId = useSelector(selectActiveUserId);
  const { isAuthenticatedUser } = useIsAuthenticatedUser();

  const { reactOnPostQuery } = usePostQuery();
  const { activateSharePostModal } = usePost();

  function handleShowComment(e) {
    e.preventDefault();
    setShowCommnents((prevState) => !prevState);
  }

  function reactionHandler(e) {
    e.preventDefault();
    reactOnPostQuery({
      postReaction: e.currentTarget.dataset.reaction,
      postId: data._id,
    });
  }

  function shareHandler(e) {
    e.preventDefault();
    activateSharePostModal(destructurePostShareData(data));
  }

  const isUserInteracted = data.reactions?.find(
    (reaction) => reaction.author === activeUserId
  );

  return (
    <form
      className={`${styles.postActions} ${className || ""}`}
      data-post-actions
    >
      {isAuthenticatedUser && (
        <>
          <ReactionBTN
            reactOnPostHandler={reactionHandler}
            reactionsAmount={data?.likesAmount}
            reaction={true}
            isUserInteracted={isUserInteracted?.reaction}
          />
          <ReactionBTN
            reactOnPostHandler={reactionHandler}
            reactionsAmount={data?.dislikesAmount}
            reaction={false}
            isUserInteracted={isUserInteracted?.reaction}
          />
        </>
      )}
      <CommentBTN
        redirect={redirect}
        commentsAmount={data?.commentsAmount}
        setShowCommnents={setShowCommnents}
        handleShowComment={handleShowComment}
      />
      {isAuthenticatedUser && <ShareBTN shareHandler={shareHandler} />}
    </form>
  );
}

export default PostActions;
