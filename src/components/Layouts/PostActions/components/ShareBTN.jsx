import { ShareIcon } from "components/Layouts/Icons";

function ShareBTN({ shareHandler }) {
  return (
    <button onClick={shareHandler} title="share the post">
      <ShareIcon />
    </button>
  );
}

export default ShareBTN;
