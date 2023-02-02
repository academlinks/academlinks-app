import ForgotPassword from "../../components/Authentication/ForgotPassword";
import { useDocTitle } from "../../hooks";

function ForgotPasswordPage(props) {
  useDocTitle("");
  
  return <ForgotPassword />;
}

export default ForgotPasswordPage;
