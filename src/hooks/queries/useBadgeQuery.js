import { useDispatch } from "react-redux";
import {
  getUnseenRequestsCount,
  resetUnseenRequestsCount,
  encreaseUnseenRequestsCount,
  getUnseenConversationsCount,
  resetUnseenConversationsCount,
  encreaseUnseenConversationsCount,
  getUnseenNotificationsCount,
  resetUnseenNotificationsCount,
  encreaseUnseenNotificationsCount,
} from "../../store/reducers/badgeReducer";

export default function useBadgeQuery() {
  const dispatch = useDispatch();

  // NoN API Tasks
  function encreaseUnseenRequestsCountHandler(count) {
    dispatch(encreaseUnseenRequestsCount(count));
  }

  function encreaseUnseenConversationsCountHandler(data) {
    dispatch(encreaseUnseenConversationsCount(data));
  }

  function encreaseUnseenNotificationsCountHandler(data) {
    dispatch(encreaseUnseenNotificationsCount(data));
  }

  // API Tasks
  function getUnseenRequestCountQuery(userId) {
    dispatch(getUnseenRequestsCount(userId));
  }

  function resetUnseenRequestsCountQuery(userId) {
    dispatch(resetUnseenRequestsCount(userId));
  }

  function getUnseenConversationsCountQuery(userId) {
    dispatch(getUnseenConversationsCount(userId));
  }

  function resetUnseenConversationsCountQuery(userId) {
    dispatch(resetUnseenConversationsCount(userId));
  }

  function getNotificationCountQuery(userId) {
    dispatch(getUnseenNotificationsCount(userId));
  }

  function resetUnseenNotificationsCountQuery(userId) {
    dispatch(resetUnseenNotificationsCount(userId));
  }

  return {
    // NoN API Tasks
    encreaseUnseenRequestsCountHandler,
    encreaseUnseenConversationsCountHandler,
    encreaseUnseenNotificationsCountHandler,
    // API Tasks
    getUnseenRequestCountQuery,
    resetUnseenRequestsCountQuery,
    getUnseenConversationsCountQuery,
    resetUnseenConversationsCountQuery,
    getNotificationCountQuery,
    resetUnseenNotificationsCountQuery,
  };
}
