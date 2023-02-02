import styles from './spinner.module.scss';
import { SpinnerIcon } from '../../Layouts/Icons/icons';

function StandSpinner() {
  return (
    <div className={styles.standSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default StandSpinner;
