import UpdateForgotPassword from "components/Authentication/UpdateForgotPassword";
import { useDocTitle } from "hooks/layoutBased";

function UpdateForgotPasswordPage() {
  useDocTitle("");

  return <UpdateForgotPassword />;
}

export default UpdateForgotPasswordPage;
