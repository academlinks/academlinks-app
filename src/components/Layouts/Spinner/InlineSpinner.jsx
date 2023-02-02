import styles from './spinner.module.scss';
import { SpinnerIcon } from '../../Layouts/Icons/icons';

function InlineSpinner() {
  return (
    <div className={styles.inlineSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default InlineSpinner;
