// import moment from 'moment';
import { useSelector } from "react-redux";

import { formatDate } from "lib";
import { selectUserInfo } from "store/selectors/userSelectors";

import {
  CalendarIcon,
  LocationIcon,
  CaseIcon,
  PersonIcon,
  RotateIcon,
} from "components/Layouts/Icons";
import styles from "./styles/postsPageUserInfo.module.scss";

function PostsPageUserInfo() {
  const {
    birthDate,
    from,
    currentLivingPlace,
    workplace,
    friendsAmount,
    createdAt,
  } = useSelector(selectUserInfo);

  return (
    <ul className={styles.postsPageUserShortInfoList}>
      {birthDate && (
        <li>
          <CalendarIcon className={styles.icon} />
          <div>
            <span>Birthdate </span>
            <strong>{formatDate(birthDate, "verbal")}</strong>
          </div>
        </li>
      )}
      {Object.values(from)[0] && (
        <li>
          <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
          <div>
            <span>From </span>
            <strong>{from.city} </strong>
            <strong>{from.country}</strong>
          </div>
        </li>
      )}
      {Object.values(currentLivingPlace)[0] && (
        <li>
          <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
          <div>
            <span>Lives in </span>
            <strong>{currentLivingPlace.city} </strong>
            <strong>{currentLivingPlace.country}</strong>
          </div>
        </li>
      )}
      {Object.values(workplace)[0] && (
        <li>
          <CaseIcon className={styles.icon} />
          <div>
            <span>Currently works at </span>
            <strong>{workplace.institution} </strong>
            <span>as </span>
            <strong>{workplace.position}</strong>
          </div>
        </li>
      )}
      <li>
        <PersonIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <div>
          <span>Friends </span>
          <strong>{friendsAmount}</strong>
        </div>
      </li>
      <li>
        <RotateIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <div>
          <span>Joined at </span>
          <strong>{formatDate(createdAt, "verbal")}</strong>
        </div>
      </li>
    </ul>
  );
}

export default PostsPageUserInfo;
