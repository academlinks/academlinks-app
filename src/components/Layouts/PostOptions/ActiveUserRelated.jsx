import { Audience } from "components/Layouts";
import styles from "./styles/optionsBody.module.scss";

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
          data-options-modal-button
          data-options-modal-nested-modal-button
        >
          <Audience audience={audience} />
          <span>{audience === "users" ? "only users" : audience}</span>
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
              data-options-modal-button
              data-options-modal-nested-button
            >
              <PublicIcon />
              <span>public</span>
            </button>
            {isBlogPostOptions && (
              <button
                name="users"
                onClick={(e) => handleAudience(e.target.name)}
                data-options-modal-button
                data-options-modal-nested-button
              >
                <GroupIcon />
                <span>only users</span>
              </button>
            )}
            {!isBlogPostOptions && (
              <>
                <button
                  name="friends"
                  onClick={(e) => handleAudience(e.target.name)}
                  data-options-modal-button
                  data-options-modal-nested-button
                >
                  <FriendIcon />
                  <span>friends</span>
                </button>
                <button
                  name="private"
                  onClick={(e) => handleAudience(e.target.name)}
                  data-options-modal-button
                  data-options-modal-nested-button
                >
                  <LockIcon />
                  <span>private</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <button
        className={styles.postOptBtn}
        onClick={handleUpdate}
        data-options-modal-button
      >
        <UpdateIcon />
        <span>update</span>
      </button>
      <button
        className={`${styles.postOptBtn} ${styles.postOptBtnDelete}`}
        onClick={handleDeletePopUp}
        data-options-modal-button
        data-options-modal-delete-button
      >
        <DeleteIcon />
        <span>delete</span>
      </button>
    </>
  );
}

export default ActiveUserRelated;
