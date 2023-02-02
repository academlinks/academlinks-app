import { Link } from "react-router-dom";

import styles from "./userIdentifier.module.scss";
import { TimeAgoAndAudience, Avatar } from "../";

/**
 * shows user image||avatar, userName and timeAgo Text
 * @param {Boolean} withTime by default true. defines if component will be rendered with timeAgo text. if true please even pass timeAgo prop
 * @param {String} timeAgo String||DateObject
 * @param {String} userName userName string
 * @param {String} img userImg url
 * @param {dateObject} className for more controll. passed on top level||parent element
 * @returns
 */
function UserIdentifier({
  userId,
  userName = "userName",
  img = "/img/avatar.png",
  withTime = true,
  timeAgo,
  audience,
  children,
  className,
}) {
  return (
    <>
      <div
        className={`${styles.userIdentifierRe} ${className || ""}`}
        data-user-identifier
      >
        <Avatar img={img} alt={userName} />
        <div className={styles.identifierInlineContainer}>
          <div className={styles.userAndTags}>
            <Link
              to={userId !== "DELETED_LINK" ? `/profile/${userId}/posts` : ""}
              className={`${styles.identifierUserName} ${
                userId === "DELETED_LINK" ? styles.deletedLink : ""
              }`}
              data-identifier-username
            >
              {userName}
            </Link>
            <span data-identifier-child>{children}</span>
          </div>
          {withTime && (
            <TimeAgoAndAudience audience={audience} timeAgo={timeAgo} />
          )}
        </div>
      </div>
    </>
  );
}

export default UserIdentifier;
