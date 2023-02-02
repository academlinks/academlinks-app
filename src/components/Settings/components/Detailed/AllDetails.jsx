import EducationDetails from "./EducationDetails";
import BirthdateDetails from "./BirthdateDetails";
import LivingplaceDetails from "./LivingplaceDetails";
import WorkplaceDetails from "./WorkplaceDetails";
import BirthplaceDetails from "./BirthplaceDetails";
import CurrentWorkplaceDetails from "./CurrentWorkplaceDetails";

import styles from "../styles/detailed.module.scss";

function AllDetails() {
  return (
    <div className={styles.allDetailsContainer}>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>birthdate</h4>
        <BirthdateDetails editable={false} withBtn={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>birthplace</h4>
        <BirthplaceDetails editable={false} withBtn={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>livingplace</h4>
        <LivingplaceDetails editable={false} withBtn={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>education</h4>
        <EducationDetails editable={false} withBtn={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>current workplace</h4>
        <CurrentWorkplaceDetails editable={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>workplaces</h4>
        <WorkplaceDetails editable={false} withBtn={false} />
      </div>
    </div>
  );
}

export default AllDetails;
