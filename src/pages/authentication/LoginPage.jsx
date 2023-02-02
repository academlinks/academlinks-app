import { Login } from "../../components/Authentication";
import { useDocTitle } from "../../hooks";

function LoginPage() {
  useDocTitle("Authentication");
  
  return <Login />;
}

export default LoginPage;
