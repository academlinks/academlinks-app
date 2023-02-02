import styles from "./styles/optionsBody.module.scss";
import { Audience } from "../";

import {
  UpdateIcon,
  DeleteIcon,
  ArrowDownRectingle,
  PublicIcon,
  FriendIcon,
  LockIcon,
  GroupIcon,
} from "../Icons/icons";

function ActiveUserRelated({
  isBlogPostOptions,
  audience,
  setActiveAudience,
  activeAudience,
  handleAudience,
  handleUpdate,
  handleDeletePopUp,
}) {
  return (
    <>
      <div className={styles.audienceBox}>
        <button
          className={styles.audienceMainBtn}
          onClick={() => setActiveAudience((prev) => !prev)}
          data-modal-sm-btn
        >
          <Audience audience={audience} />{" "}
          {audience === "users" ? "only users" : audience}
          <ArrowDownRectingle
            className={`${styles.arrowIndicator} ${
              activeAudience ? styles.arrowIndicatorActive : ""
            }`}
          />
        </button>
        {activeAudience && (
          <div className={styles.audienceOptionsList}>
            <button
              name="public"
              onClick={(e) => handleAudience(e.target.name)}
              data-modal-sm-btn
            >
              <PublicIcon />
              public
            </button>
            {isBlogPostOptions && (
              <button
                name="users"
                onClick={(e) => handleAudience(e.target.name)}
                data-modal-sm-btn
              >
                <GroupIcon />
                only users
              </button>
            )}
            {!isBlogPostOptions && (
              <>
                <button
                  name="friends"
                  onClick={(e) => handleAudience(e.target.name)}
                  data-modal-sm-btn
                >
                  <FriendIcon />
                  friends
                </button>
                <button
                  name="private"
                  onClick={(e) => handleAudience(e.target.name)}
                  data-modal-sm-btn
                >
                  <LockIcon />
                  private
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <button
        className={styles.postOptBtn}
        onClick={handleUpdate}
        data-modal-sm-btn
      >
        <UpdateIcon />
        <span>update</span>
      </button>
      <button
        className={`${styles.postOptBtn} ${styles.postOptBtnDelete}`}
        onClick={handleDeletePopUp}
        data-modal-sm-btn
      >
        <DeleteIcon />
        <span>delete</span>
      </button>
    </>
  );
}

export default ActiveUserRelated;
