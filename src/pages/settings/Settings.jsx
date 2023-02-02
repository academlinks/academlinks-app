/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useSettingsQuery,
  useRestrictPrivateRoute,
  useDocTitle,
} from "../../hooks";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { selectSettingsStatus } from "../../store/selectors/settingsSelector";

import { SettingsContainer, SideBar } from "../../components/Settings";
import { Spinner, Error } from "../../components/Layouts";

function Settings() {
  useDocTitle("Settings");

  useRestrictPrivateRoute();

  const {
    isEditing,
    editableTarget,
    loadingState: { loading, error, message },
  } = useSelector(selectSettingsStatus);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeUserId = useSelector(selectActiveUserId);

  const { getUserInfoQuery } = useSettingsQuery();

  useEffect(() => {
    getUserInfoQuery(activeUserId);
  }, []);

  useEffect(() => {
    if (!isEditing && !editableTarget && pathname.endsWith("edit"))
      navigate(`/settings/${activeUserId}`, { replace: true });
  }, [isEditing, editableTarget]);

  return (
    <SettingsContainer>
      <SideBar />
      {loading && <Spinner />}
      {!loading && !error && <Outlet />}
      {error && <Error msg={message} />}
    </SettingsContainer>
  );
}

export default Settings;
