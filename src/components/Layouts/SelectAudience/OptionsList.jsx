import { PublicIcon, GroupIcon, FriendIcon, LockIcon } from "../Icons";
import styles from "./selectAudience.module.scss";

function OptionsList({ handleSelection, isBlogPostAudience }) {
  return (
    <div className={styles.audienceSelectionsList}>
      <button
        name="public"
        onClick={(e) => handleSelection(e.currentTarget.name)}
      >
        <PublicIcon />
        <span>public</span>
      </button>
      {isBlogPostAudience && (
        <button
          name="users"
          onClick={(e) => handleSelection(e.currentTarget.name)}
        >
          <GroupIcon />
          <span>only users</span>
        </button>
      )}
      {!isBlogPostAudience && (
        <>
          <button
            name="friends"
            onClick={(e) => handleSelection(e.currentTarget.name)}
          >
            <FriendIcon />
            <span>friends</span>
          </button>
          <button
            name="private"
            onClick={(e) => handleSelection(e.currentTarget.name)}
          >
            <LockIcon />
            <span>private</span>
          </button>
        </>
      )}
    </div>
  );
}

export default OptionsList;
