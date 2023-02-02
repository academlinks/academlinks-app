import { ShareIcon } from "../../../Layouts/Icons/icons";

function ShareBTN({ shareHandler }) {
  return (
    <button onClick={shareHandler} title="share the post">
      <ShareIcon />
    </button>
  );
}

export default ShareBTN;
