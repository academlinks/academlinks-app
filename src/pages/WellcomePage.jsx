import Wellcome from "components/Wellcome/Wellcome";
import { useDocTitle } from "hooks/layoutBased";

function WellcomePage() {
  useDocTitle("")

  return <Wellcome />;
}

export default WellcomePage;
