import { useDispatch, useSelector } from "react-redux";

import { selectIsActiveNotifications } from "../../store/selectors/notificationSelectors";

import { setActiveNotifications } from "../../store/reducers/notificationReducer";

export default function useNotifications() {
  const dispatch = useDispatch();

  const activeNotifications = useSelector(selectIsActiveNotifications);

  const activateNotifications = () =>
    dispatch(setActiveNotifications(!activeNotifications));

  const deactivateNotifications = () => dispatch(setActiveNotifications(false));

  return { activateNotifications, deactivateNotifications };
}
