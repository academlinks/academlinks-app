import { Outlet } from "react-router-dom";

import { useRestrictPrivateRoute } from "hooks/auth";

import ProfileReviewNav from "components/ProfileReview/ProfileReviewNav";
import ProfileReviewContainer from "components/ProfileReview/ProfileReviewContainer";

function ProfileReviewPage() {
  useRestrictPrivateRoute();

  return (
    <ProfileReviewContainer>
      <ProfileReviewNav />
      <Outlet />
    </ProfileReviewContainer>
  );
}

export default ProfileReviewPage;
