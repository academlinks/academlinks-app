import { useDispatch } from "react-redux";
import {
  getUserProfile,
  resetUserError,
} from "../../store/reducers/userReducer";

export default function useUserProfileQuery() {
  const dispatch = useDispatch();

  function getUserProfileQuery(profileId) {
    dispatch(getUserProfile(profileId));
  }

  function handleResetError() {
    dispatch(resetUserError());
  }

  return { getUserProfileQuery, handleResetError };
}
