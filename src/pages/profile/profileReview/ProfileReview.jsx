import { Outlet } from "react-router-dom";

import { useRestrictPrivateRoute } from "../../../hooks";

import ProfileReviewNav from "../../../components/ProfileReview/ProfileReviewNav";
import ProfileReviewContainer from "../../../components/ProfileReview/ProfileReviewContainer";

function ProfileReview() {
  useRestrictPrivateRoute();

  return (
    <ProfileReviewContainer>
      <ProfileReviewNav />
      <Outlet />
    </ProfileReviewContainer>
  );
}

export default ProfileReview;
