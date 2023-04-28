/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";

import { useSettings } from "hooks/layoutBased";
import { selectSettingsStatus } from "store/selectors/settingsSelector";

import { toRender } from "./config";
import { Spinner } from "components/Layouts";
import ContentContainer from "./components/ContentContainer";
import styles from "./components/styles/detailed.module.scss";

function ReadableContent() {
  const { target, isEditing, headingTitle } = useSelector(selectSettingsStatus);

  const { handleResetEditingTarget } = useSettings();

  useEffect(() => {
    if (!isEditing) return;
    handleResetEditingTarget();
  }, [isEditing]);

  return (
    <ContentContainer>
      <h3 className={styles.settingsHeading}>{headingTitle}</h3>
      <Suspense fallback={<Spinner />}>{toRender.detailed[target]}</Suspense>
    </ContentContainer>
  );
}

export default ReadableContent;
