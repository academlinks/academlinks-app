import { useNavigate, Link } from "react-router-dom";

import styles from "./styles/feedHeader.module.scss";
import { Avatar, GoBackBTN } from "components/Layouts";

function FeedHeader({ adressat }) {
  const navigate = useNavigate();

  return (
    <div className={styles.feedHeadingBox}>
      <Avatar img={adressat?.profileImg} />
      <GoBackBTN
        handler={() => navigate("/messanger")}
        className={styles.conversationGoBackBtn}
      />
      <Link
        to={adressat?._id ? `/profile/${adressat._id}/posts` : ""}
        className={styles.feedAuthor}
      >
        {adressat?.userName || adressat?.cachedUserName}
      </Link>
    </div>
  );
}

export default FeedHeader;
