import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  RestrictionAuthorised,
  RestrictionUnAuthorised,
  UnauthorisedPortals,
} from "pages";

import { Navigation } from "./components";
import { StandSpinner } from "./components/Layouts";

// SECTION: > Wellcome Page
const WellcomePage = lazy(() => import("./pages/WellcomePage"));
const TermsAndPolicyPage = lazy(() =>
  import("./pages/TermsAndPolicy/TermsAndPolicyPage")
);
const PolicyPage = lazy(() => import("./pages/TermsAndPolicy/PolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsAndPolicy/TermsPage"));

// SECTION: > Unknown Page
const UnknownPage = lazy(() => import("./pages/UnknownPage/UnknownPage"));

// SECTION: > Authentication Pages
const LoginPage = lazy(() => import("./pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("./pages/authentication/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/authentication/ForgotPasswordPage")
);
const UpdateForgotPasswordPage = lazy(() =>
  import("./pages/authentication/UpdateForgotPasswordPage")
);
const RegistrationConfirmPasswordPage = lazy(() =>
  import("./pages/authentication/RegistrationConfirmPasswordPage")
);

// SECTION: > Feed Page
const FeedPage = lazy(() => import("./pages/feed/FeedPage"));

// SECTION: > Profile Pages
const UserPage = lazy(() => import("./pages/profile/UserPage"));
const PostsPage = lazy(() => import("./pages/profile/PostsPage"));
const AboutPage = lazy(() => import("./pages/profile/AboutPage"));
const BookmarksPage = lazy(() => import("./pages/profile/BookmarksPage"));

const FriendsPage = lazy(() => import("./pages/profile/friends/FriendsPage"));
const AllFriendsPage = lazy(() =>
  import("./pages/profile/friends/AllFriendsPage")
);
const SentRequestsPage = lazy(() =>
  import("./pages/profile/friends/SentRequestsPage")
);
const PendingRequestsPage = lazy(() =>
  import("./pages/profile/friends/PendingRequestsPage")
);

const ProfileReviewPage = lazy(() =>
  import("./pages/profile/profileReview/ProfileReviewPage")
);
const ReviewTaggedPostsPage = lazy(() =>
  import("./pages/profile/profileReview/ReviewTaggedPostsPage")
);
const ReviewHiddenPostsPage = lazy(() =>
  import("./pages/profile/profileReview/ReviewHiddenPostsPage")
);

// SECTION: > Messanger
const MessangerPage = lazy(() => import("./pages/Messanger/MessangerPage"));
const MessangerFeedPage = lazy(() =>
  import("./pages/Messanger/MessangerFeedPage")
);

// SECTION: > Settings
const SettingsPage = lazy(() => import("./pages/settings/Settings"));
const ReadableSettingsContentPage = lazy(() =>
  import("./pages/settings/ReadableContentPage")
);
const EditableSettingsContentPage = lazy(() =>
  import("./pages/settings/EditableContentPage")
);

// SECTION: > Blog
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const ActiveBlogPost = lazy(() => import("./pages/blog/ActiveBlogPostPage"));

// SECTION: > Redirected Post
const PostPage = lazy(() => import("./pages/Post/PostPage"));

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <UnauthorisedPortals />
      <Suspense fallback={<StandSpinner />}>
        <Routes>
          <Route path="/blog/:id" element={<ActiveBlogPost />} />
          <Route path="/terms-and-policy" element={<TermsAndPolicyPage />}>
            <Route path="terms" element={<TermsPage />} />
            <Route path="policy" element={<PolicyPage />} />
          </Route>
          <Route element={<RestrictionAuthorised />}>
            <Route path="/" element={<WellcomePage />} />
            <Route path="/authentication/login" element={<LoginPage />} />
            <Route path="/authentication/register" element={<RegisterPage />} />
            <Route
              path="/authentication/forgot-password"
              element={<ForgotPasswordPage />}
            />
            <Route
              path="/authentication/forgot-password/update"
              element={<UpdateForgotPasswordPage />}
            />
            <Route
              path="/confirmRegistration/:registrationId/confirm/:tokenId"
              element={<RegistrationConfirmPasswordPage />}
            />
          </Route>
          <Route element={<RestrictionUnAuthorised />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile/:id" element={<UserPage />}>
              <Route path="posts" element={<PostsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="friends" element={<FriendsPage />}>
                <Route path="all-friends" element={<AllFriendsPage />} />
                <Route path="sent-requests" element={<SentRequestsPage />} />
                <Route
                  path="pending-requests"
                  element={<PendingRequestsPage />}
                />
              </Route>
              <Route path="bookmarks" element={<BookmarksPage />} />
              <Route path="profile-review" element={<ProfileReviewPage />}>
                <Route path="tags" element={<ReviewTaggedPostsPage />} />
                <Route path="hidden" element={<ReviewHiddenPostsPage />} />
              </Route>
            </Route>
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/blog" element={<BlogPage />} />

            <Route path="/messanger" element={<MessangerPage />}>
              <Route path=":id" element={<MessangerFeedPage />} />
            </Route>
            <Route path="/settings/:id" element={<SettingsPage />}>
              <Route index element={<ReadableSettingsContentPage />} />
              <Route path="edit" element={<EditableSettingsContentPage />} />
            </Route>
          </Route>
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
