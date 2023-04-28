import { TimeAgo,Audience } from "components/Layouts";
import styles from "./timeAgoAndAudience.module.scss";

function TimeAgoAndAudience({ timeAgo, audience }) {
  return (
    <div className={styles.timeAndAudience} title={`${audience} audience`}>
      <TimeAgo date={timeAgo} className={styles.dateTimeAgo} />
      <Audience audience={audience} />
    </div>
  );
}

export default TimeAgoAndAudience;
