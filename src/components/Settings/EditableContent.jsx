/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectSettingsStatus } from "../../store/selectors/settingsSelector";

import { toRender } from "./config";
import ContentContainer from "./components/ContentContainer";
import styles from "./components/styles/detailed.module.scss";
import { Spinner } from "../Layouts";

function EditableContent() {
  const navigate = useNavigate();

  const { editableTarget, headingTitle } = useSelector(selectSettingsStatus);

  useEffect(() => {
    if (!editableTarget) navigate("/settings");
  }, []);

  return (
    <ContentContainer>
      <h3 className={styles.settingsHeading}>{headingTitle}</h3>
      <Suspense fallback={<Spinner />}>
        {toRender.forms[editableTarget]}
      </Suspense>
    </ContentContainer>
  );
}

export default EditableContent;
