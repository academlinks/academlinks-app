import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";

/**
 * @param {*} basedOn basedOnId | basedOnLocation
 * @param {*} userId required only if basedOn is defined as 'basedOnId'
 * @returns
 */
function useForeignUser(basedOn, userId) {
  const activeUserId = useSelector(selectActiveUserId);
  const { id: profileId } = useParams();

  const run = {
    basedOnId: userId ? activeUserId === userId : activeUserId === profileId,
    basedOnLocation: activeUserId === profileId,
  };

  return { isActiveUser: run[basedOn], profileId };
}

export default useForeignUser;
