import { useSelector } from "react-redux";
import { selectAboutUserData } from "store/selectors/aboutPageSelectors";

import styles from "./about.module.scss";
import {
  BirthdateFragment,
  LivingplaceFragment,
  FromFragment,
  EducationFragment,
  WorkplaceFragment,
  RegisterFragment,
  EmailFragment,
  GenderFragment,
} from "components/Layouts";

function NewVersion() {
  const data = useSelector(selectAboutUserData);

  return (
    data && (
      <div className={styles.newVersionInlineContainer}>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>registered</h4>
          <RegisterFragment data={data.createdAt} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>email</h4>
          <EmailFragment data={data.email} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>birthdate</h4>
          <BirthdateFragment data={data.birthDate} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>gender</h4>
          <GenderFragment data={data.gender} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>bithplace</h4>
          <LivingplaceFragment data={data.currentLivingPlace} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>livingplace</h4>
          <FromFragment data={data.from} />
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>education</h4>
          <div className={styles.nestedList}>
            {data.education.map((edu) => (
              <EducationFragment data={edu} key={edu._id} />
            ))}
          </div>
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>current workplace</h4>
          <div className={styles.nestedList}>
            <WorkplaceFragment data={data.currentWorkplace} />
          </div>
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoBlockHeading}>workplaces</h4>
          <div className={styles.nestedList}>
            {data.workplace.map((workplace) => (
              <WorkplaceFragment data={workplace} key={workplace._id} />
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default NewVersion;
