/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";
import { selectAllBadgeCount } from "../../../store/selectors/badgeSelectors";

import { useBlurOnBody, useBadgeQuery, useNotifications } from "../../../hooks";

import styles from "./styles/navActions.module.scss";
import { NavAvatar, NavSearchBar } from "./";
import {
  UserFriendRequestsIcon,
  EmailIcon,
  NotificationIcon,
  BurgerIcon,
} from "../../Layouts/Icons/icons";

function NavActions({ activateNav }) {
  const activeUserId = useSelector(selectActiveUserId);
  const { requestCount, messageCount, notificationCount } =
    useSelector(selectAllBadgeCount);

  const { activateNotifications, deactivateNotifications } = useNotifications();

  const {
    getUnseenRequestCountQuery,
    getUnseenConversationsCountQuery,
    getNotificationCountQuery,
  } = useBadgeQuery();

  useEffect(() => {
    getUnseenRequestCountQuery(activeUserId);
    getUnseenConversationsCountQuery(activeUserId);
    getNotificationCountQuery(activeUserId);
  }, []);

  const { onFocus } = useBlurOnBody(
    activateNotifications,
    deactivateNotifications,
    ["notification--modal", "notification--nav__btn"]
  );

  return (
    <div className={styles.mainNavActions}>
      <NavSearchBar />
      <button className={styles.actionBtn} title="pending friend requests">
        <Link
          to={`/profile/${activeUserId}/friends/pending-requests`}
          aria-label="navigate to pending friend requests"
        >
          <UserFriendRequestsIcon />
        </Link>
        {requestCount > 0 && (
          <span className={styles.actionBadge}>{requestCount}</span>
        )}
      </button>
      <button className={styles.actionBtn} title="messages">
        <Link to="/messanger" aria-label="navigate to messages">
          <EmailIcon />
        </Link>
        {messageCount > 0 && (
          <span className={styles.actionBadge}>{messageCount}</span>
        )}
      </button>
      <button
        onClick={onFocus}
        className={`notification--nav__btn ${styles.actionBtn}`}
        title="notifications"
      >
        <NotificationIcon />
        {notificationCount > 0 && (
          <span className={styles.actionBadge}>{notificationCount}</span>
        )}
      </button>
      <button
        onClick={() => activateNav()}
        className={`${styles.mainNavActionsBurgerBtn} burger--btn`}
        title="open navigation"
      >
        <BurgerIcon />
      </button>
      <NavAvatar />
    </div>
  );
}

export default NavActions;
