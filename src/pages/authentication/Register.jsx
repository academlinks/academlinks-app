import { Register } from "../../components/Authentication";
import { useDocTitle } from "../../hooks";

function RegisterPage() {
  useDocTitle("Register");

  return <Register />;
}

export default RegisterPage;
