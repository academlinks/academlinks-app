import TimeAgoEl from "react-timeago";
import styles from "./timeAgo.module.scss";

function TimeAgo({ date = new Date(), className }) {
  return (
    <span className={`${styles.timeAgo} ${className || ""}`} data-time-ago>
      <TimeAgoEl date={date} />
    </span>
  );
}

export default TimeAgo;
