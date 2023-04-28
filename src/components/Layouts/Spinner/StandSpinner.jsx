import { SpinnerIcon } from 'components/Layouts/Icons';
import styles from './spinner.module.scss';

function StandSpinner() {
  return (
    <div className={styles.standSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default StandSpinner;
