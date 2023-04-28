import { useDispatch } from "react-redux";
import { getCommercials } from "store/reducers/commercialReducer";

export default function useCommercialQuery() {
  const dispatch = useDispatch();

  function getCommercialQuery(location) {
    dispatch(getCommercials(location));
  }

  return { getCommercialQuery };
}
