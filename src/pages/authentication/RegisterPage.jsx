import { Register } from "components/Authentication";
import { useDocTitle } from "hooks/layoutBased";

function RegisterPage() {
  useDocTitle("Register");

  return <Register />;
}

export default RegisterPage;
