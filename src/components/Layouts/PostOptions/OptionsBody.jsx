import { useState } from "react";

import { useSavePostQuery, usePostQuery } from "hooks/queries";

import {
  BookmarkFillIcon,
  BookmarkOutlineIcon,
  // ErrorIcon,
  RemoveIcon,
  HideIcon,
} from "components/Layouts/Icons";
import { Spinner } from "components/Layouts";
import ActiveUserRelated from "./ActiveUserRelated";
import styles from "./styles/optionsBody.module.scss";

function OptionsBody({
  postId,
  audience,
  isBlogPostOptions,
  handleUpdate,
  handleDeletePopUp,
  removeTagHandler,
  hideFromProfileHandler,
}) {
  const { loading, optionsRules, handleSavePost } = useSavePostQuery(postId);
  const { changePostAudienceQuery } = usePostQuery();

  const [activeAudience, setActiveAudience] = useState(false);

  function handleAudience(value) {
    if (value === audience) return setActiveAudience(false);
    changePostAudienceQuery(postId, value);
    setActiveAudience(false);
  }

  return (
    <div className={`${styles.postOptionsModal}  options--big--modal--window`}>
      {loading && <Spinner />}
      {!loading && (
        <>
          <button
            className={`${styles.postOptBtn} ${styles.bookmark}`}
            onClick={handleSavePost}
            data-modal-sm-btn
          >
            {optionsRules?.isBookmarked && <BookmarkFillIcon />}
            {!optionsRules?.isBookmarked && <BookmarkOutlineIcon />}
            <span>save</span>
          </button>
          {optionsRules?.belongsToUser && (
            <ActiveUserRelated
              isBlogPostOptions={isBlogPostOptions}
              audience={audience}
              setActiveAudience={setActiveAudience}
              activeAudience={activeAudience}
              handleAudience={handleAudience}
              handleUpdate={handleUpdate}
              handleDeletePopUp={handleDeletePopUp}
            />
          )}
          {optionsRules?.isTagged && (
            <button
              className={styles.postOptBtn}
              onClick={removeTagHandler}
              data-modal-sm-btn
            >
              <RemoveIcon />
              <span>remove tag</span>
            </button>
          )}
          {!isBlogPostOptions &&
            (optionsRules?.belongsToUserAndIsVisible ||
              optionsRules?.isTaggedAndIsVisible) && (
              <button
                className={styles.postOptBtn}
                onClick={hideFromProfileHandler}
                data-modal-sm-btn
              >
                <HideIcon />
                <span>hide from profile</span>
              </button>
            )}
          {/* <button className={styles.postOptBtn} data-modal-sm-btn>
            <ErrorIcon />
            <span>report</span>
          </button> */}
        </>
      )}
    </div>
  );
}

export default OptionsBody;
