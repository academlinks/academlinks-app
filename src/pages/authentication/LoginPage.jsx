import { Login } from "components/Authentication";
import { useDocTitle } from "hooks/layoutBased";

function LoginPage() {
  useDocTitle("Authentication");
  
  return <Login />;
}

export default LoginPage;
