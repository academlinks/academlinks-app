import { useState } from "react";

import styles from "./styles/friendOptions.module.scss";
import {
  DotsHorizontalIcon,
  DeleteFriendIcon,
} from "../../Layouts/Icons/icons";

function FriendOptions({ deleteFriendHandler }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.friendOptBox}>
      <button
        className={styles.optBtn}
        data-friend-opt-btn
        onClick={() => setOpen((prev) => !prev)}
      >
        <DotsHorizontalIcon />
      </button>
      {open && (
        <div className={styles.friendOptWindow}>
          <button
            onClick={() => {
              deleteFriendHandler();
              setOpen(false);
            }}
          >
            <DeleteFriendIcon /> delete friend
          </button>
        </div>
      )}
    </div>
  );
}

export default FriendOptions;
