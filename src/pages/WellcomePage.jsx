import Wellcome from "../components/Wellcome/Wellcome";
import { useDocTitle } from "../hooks";

function WellcomePage() {
  useDocTitle("")

  return <Wellcome />;
}

export default WellcomePage;
