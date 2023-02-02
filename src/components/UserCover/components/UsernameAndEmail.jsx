import { useSelector } from 'react-redux';
import { selectUserNameAndEmail } from '../../../store/selectors/userSelectors';

import styles from './styles/usernameAndEmail.module.scss';

function UsernameAndEmail() {
  const { userName, email } = useSelector(selectUserNameAndEmail);

  return (
    <div className={styles.userNameAndEmail}>
      <p className={styles.userName}>{userName}</p>
      <p className={styles.email}>{email}</p>
    </div>
  );
}

export default UsernameAndEmail;
