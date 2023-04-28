import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import { selectAllModalActiveStatus } from "store/selectors/portalSelectors";
import { selectCreatePostModalStatuses } from "store/selectors/createPostSelectors";

import { StandSpinner } from "components/Layouts";

const UpdateBlogPostPortal = lazy(() =>
  import("components/Portal/UpdateBlogPostPortal")
);
const SharePostPortal = lazy(() => import("components/Portal/SharePostPortal"));

function UnauthorisedPortals() {
  const { sharePostModalIsOpen } = useSelector(selectAllModalActiveStatus);

  const { updateBlogPostModalIsOpen } = useSelector(
    selectCreatePostModalStatuses
  );
  return (
    <Suspense fallback={<StandSpinner />}>
      {updateBlogPostModalIsOpen && <UpdateBlogPostPortal />}
      {sharePostModalIsOpen && <SharePostPortal />}
    </Suspense>
  );
}

export default UnauthorisedPortals;
