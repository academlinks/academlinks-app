import { format } from "timeago.js";
import styles from "./timeAgo.module.scss";

function TimeAgo({ date = new Date(), className }) {
  return (
    <span className={`${styles.timeAgo} ${className || ""}`} data-time-ago>
      {format(date)}
    </span>
  );
}

export default TimeAgo;
