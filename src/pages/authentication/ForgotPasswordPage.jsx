import ForgotPassword from "components/Authentication/ForgotPassword";
import { useDocTitle } from "hooks/layoutBased";

function ForgotPasswordPage() {
  useDocTitle("");
  
  return <ForgotPassword />;
}

export default ForgotPasswordPage;
