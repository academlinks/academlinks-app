import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  resetIsEditing,
  setTarget,
  setIsEditing,
  resetTarget,

  // updateables
  updateBirthdate,
  resetBirthdate,
  updateBirthplace,
  resetBirthplace,
  updateLivingPlace,
  resetLivingPlace,
  updateEducation,
  resetEducation,
  updateWorkplace,
  resetWorkplace,
  updateCurrentWorkplace,
  resetCurrentWorkplace,
} from "../../store/reducers/settingsReducer";

export default function useSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleMenuEditableTarget(editableKey) {
    dispatch(setTarget(editableKey));
    dispatch(setIsEditing(editableKey));

    navigate("edit");
  }

  function handleMenuDetailedTarget(isEditing, detailedKey) {
    isEditing && dispatch(resetIsEditing());
    dispatch(setTarget(detailedKey));

    navigate("");
  }

  function handleEditingTarget({ editableKey, pathParams }) {
    dispatch(setIsEditing(editableKey));
    navigate("edit", { state: pathParams });
  }

  function handleResetEditingTarget() {
    dispatch(resetIsEditing());
  }

  function handleGoBack() {
    dispatch(resetTarget());
  }

  //updateables

  function handleUpdateBirthdate(data) {
    dispatch(updateBirthdate(data));
  }

  function handleResetBirthdate() {
    dispatch(resetBirthdate());
  }

  function handleUpdateBirthplace(data) {
    dispatch(updateBirthplace(data));
  }

  function handleResetBirthplace() {
    dispatch(resetBirthplace());
  }

  function handleUpdateLivingplace(data) {
    dispatch(updateLivingPlace(data));
  }

  function handleResetLivingplace() {
    dispatch(resetLivingPlace());
  }

  function handleUpdateEducation(data) {
    dispatch(updateEducation(data));
  }

  function handleResetEducation() {
    dispatch(resetEducation());
  }

  function handleUpdateCurrentWorkplace(data) {
    dispatch(updateCurrentWorkplace(data));
  }

  function handleResetCurrentWorkplace(data) {
    dispatch(resetCurrentWorkplace(data));
  }

  function handleUpdateWorkplace(data) {
    dispatch(updateWorkplace(data));
  }

  function handleResetWorkplace() {
    dispatch(resetWorkplace());
  }

  function handleCancel(reseter) {
    navigate(-1, { replace: true });
    reseter();
  }

  return {
    handleMenuDetailedTarget,
    handleMenuEditableTarget,
    handleEditingTarget,
    handleResetEditingTarget,
    handleGoBack,

    // updateables

    handleUpdateBirthdate,
    handleResetBirthdate,
    handleUpdateBirthplace,
    handleResetBirthplace,
    handleUpdateLivingplace,
    handleResetLivingplace,
    handleUpdateEducation,
    handleResetEducation,
    handleUpdateCurrentWorkplace,
    handleResetCurrentWorkplace,
    handleUpdateWorkplace,
    handleResetWorkplace,
    handleCancel,
  };
}
