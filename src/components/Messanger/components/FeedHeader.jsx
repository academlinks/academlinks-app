import { useNavigate, Link } from "react-router-dom";

import styles from "./styles/feedHeader.module.scss";
import { Avatar, GoBackBTN } from "components/Layouts";

function FeedHeader({ adressat }) {
  const navigate = useNavigate();

  return (
    <div className={styles.feedHeadingBox}>
      <div className={styles.user}>
        <Avatar img={adressat?.profileImg} />
        <Link
          to={adressat?._id ? `/profile/${adressat._id}/posts` : ""}
          className={styles.feedAuthor}
        >
          {adressat?.userName || adressat?.cachedUserName}
        </Link>
      </div>

      <GoBackBTN
        handler={() => navigate("/messanger")}
        className={styles.conversationGoBackBtn}
      />
    </div>
  );
}

export default FeedHeader;
