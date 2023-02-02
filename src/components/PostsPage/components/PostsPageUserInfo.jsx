// import moment from 'moment';
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../store/selectors/userSelectors";
import { formatDate } from "../../../lib";

import styles from "./styles/postsPageUserInfo.module.scss";
import {
  CalendarIcon,
  LocationIcon,
  CaseIcon,
  PersonIcon,
  RotateIcon,
} from "../../Layouts/Icons/icons";

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
          <span>
            <span>Birthdate </span>
            <strong>{formatDate(birthDate, "verbal")}</strong>
          </span>
        </li>
      )}
      {Object.values(from)[0] && (
        <li>
          <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
          <span>
            <span>From </span>
            <strong>{from.city} </strong>
            <strong>{from.country}</strong>
          </span>
        </li>
      )}
      {Object.values(currentLivingPlace)[0] && (
        <li>
          <LocationIcon className={`${styles.icon} ${styles.smallIcon}`} />
          <span>
            <span>Lives in </span>
            <strong>{currentLivingPlace.city} </strong>
            <strong>{currentLivingPlace.country}</strong>
          </span>
        </li>
      )}
      {Object.values(workplace)[0] && (
        <li>
          <CaseIcon className={styles.icon} />
          <span>
            <span>Currently works at </span>
            <strong>{workplace.institution} </strong>
            <span>as </span>
            <strong>{workplace.position}</strong>
          </span>
        </li>
      )}
      <li>
        <PersonIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>Friends </span>
          <strong>{friendsAmount}</strong>
        </span>
      </li>
      <li>
        <RotateIcon className={`${styles.icon} ${styles.smallIcon}`} />
        <span>
          <span>Joined at </span>
          <strong>{formatDate(createdAt, "verbal")}</strong>
        </span>
      </li>
    </ul>
  );
}

export default PostsPageUserInfo;
