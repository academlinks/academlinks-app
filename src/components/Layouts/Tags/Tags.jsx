import styles from "./tags.module.scss";
import { Link } from "react-router-dom";

function Tags({ tags, keyWord = "with" }) {
  const length = tags.length;

  return (
    <div className={styles.tagsList} data-tags>
      <span className={styles.tagKeyWord}>{keyWord} - </span>
      {length === 1 && (
        <Link
          to={`/profile/${tags[0].user?._id || tags[0]._id}/posts`}
          className={styles.tagLink}
        >
          {tags[0].user?.userName || tags[0].userName}
        </Link>
      )}
      {length === 2 && (
        <>
          <Link
            to={`/profile/${tags[0].user?._id || tags[0]._id}/posts`}
            className={styles.tagLink}
          >
            {tags[0].user?.userName || tags[0].userName}
          </Link>
          <span className={styles.tagKeyWord}>&nbsp;and&nbsp;</span>
          <Link
            to={`/profile/${tags[1].user?._id || tags[1]._id}/posts`}
            className={styles.tagLink}
          >
            {tags[1].user?.userName || tags[1].userName}
          </Link>
        </>
      )}
      {length > 2 && (
        <>
          <Link
            to={`/profile/${tags[0].user?._id || tags[0]._id}/posts`}
            className={styles.tagLink}
          >
            {tags[0].user?.userName || tags[0].userName}
          </Link>
          <span className={styles.extraTags}>
            <span className={styles.tagKeyWord}>&nbsp;and&nbsp;</span>
            <strong>{length - 1}&nbsp;others</strong>
            <div className={styles.extraTagsList}>
              {tags.slice(1).map((tag) => (
                <Link
                  to={`/profile/${tag.user?._id || tag._id}/posts`}
                  key={tag._id}
                >
                  {tag.user?.userName || tag.userName}
                </Link>
              ))}
            </div>
          </span>
        </>
      )}
    </div>
  );
}

export default Tags;
