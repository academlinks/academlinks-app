import { useState } from "react";

import { DotsHorizontalIcon, DeleteFriendIcon } from "components/Layouts/Icons";
import styles from "./styles/friendOptions.module.scss";

function FriendOptions({ deleteFriendHandler }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.friendOptBox}>
      <button
        className={styles.optionTriggerBtn}
        data-friend-opt-btn
        onClick={() => setOpen((prev) => !prev)}
      >
        <DotsHorizontalIcon />
      </button>
      {open && (
        <div className={styles.friendOptWindow}>
          <button
            data-options-modal-button
            data-options-modal-delete-button
            onClick={() => {
              deleteFriendHandler();
              setOpen(false);
            }}
          >
            <DeleteFriendIcon />
            <span>delete friend</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default FriendOptions;
