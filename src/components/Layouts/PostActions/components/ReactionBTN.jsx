import { DislikeIcon, LikeIcon } from "components/Layouts/Icons";

function ReactionBTN({
  reactOnPostHandler,
  reactionsAmount,
  reaction,
  isUserInteracted,
}) {
  const p =
    isUserInteracted === reaction
      ? { "data-user-liked": "data-user-interacted" }
      : "";
  return (
    <button
      {...p}
      data-reaction={reaction}
      onClick={reactOnPostHandler}
      title={reaction ? "like the post" : "dislike the post"}
    >
      {reaction ? <LikeIcon /> : <DislikeIcon />}
      <span>({reactionsAmount})</span>
    </button>
  );
}

export default ReactionBTN;
