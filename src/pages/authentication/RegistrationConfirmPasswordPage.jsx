import { RegistrationConfirmPassword } from "components/Authentication";
import { useDocTitle } from "hooks/layoutBased";

function RegistrationConfirmPasswordPage() {
  useDocTitle("");

  return <RegistrationConfirmPassword />;
}

export default RegistrationConfirmPasswordPage;
