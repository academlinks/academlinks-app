/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoContext } from "../../store/Io";

import { selectActiveUserShortInfo } from "../../store/selectors/activeUserSelectors";
import { selectIsActiveNotifications } from "../../store/selectors/notificationSelectors";
import { selectAllModalActiveStatus } from "../../store/selectors/portalSelectors";
import { selectCreatePostModalStatuses } from "../../store/selectors/createPostSelectors";
import { useAuthValidation } from "../../hooks";

import { StandSpinner } from "../../components/Layouts";
import Notifications from "../../components/Notifications/Notifications";

const MediaPortal = lazy(() => import("../../components/Portal/MediaPortal"));
const UpdatePostPortal = lazy(() =>
  import("../../components/Portal/UpdatePostPortal")
);
const UpdateBlogPostPortal = lazy(() =>
  import("../../components/Portal/UpdateBlogPostPortal")
);
const SharePostPortal = lazy(() =>
  import("../../components/Portal/SharePostPortal")
);

function RestrictionUnAuthorised() {
  useAuthValidation();

  const { connection } = useContext(IoContext);

  const { mediaModalIsOpen, sharePostModalIsOpen } = useSelector(
    selectAllModalActiveStatus
  );

  const { updateBlogPostModalIsOpen, updatePostModalIsOpen } = useSelector(
    selectCreatePostModalStatuses
  );

  const activeUser = useSelector(selectActiveUserShortInfo);
  const activeNotifications = useSelector(selectIsActiveNotifications);

  useEffect(() => {
    activeUser && connection(activeUser);
  }, []);

  return (
    <>
      <Suspense fallback={<StandSpinner />}>
        {mediaModalIsOpen && <MediaPortal />}
        {updatePostModalIsOpen && <UpdatePostPortal />}
        {updateBlogPostModalIsOpen && <UpdateBlogPostPortal />}
        {sharePostModalIsOpen && <SharePostPortal />}
      </Suspense>
      {activeNotifications && <Notifications />}
      <Outlet />
    </>
  );
}

export default RestrictionUnAuthorised;
