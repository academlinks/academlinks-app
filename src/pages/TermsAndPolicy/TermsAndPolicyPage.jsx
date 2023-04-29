import { Outlet } from "react-router-dom";
import { Navigation, Container } from "components/TermsAndPolicy";

function TermsAndPolicyPage(props) {
  return (
    <Container>
      <Navigation />
      <Outlet />
    </Container>
  );
}

export default TermsAndPolicyPage;
