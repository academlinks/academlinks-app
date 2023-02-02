import styles from './spinner.module.scss';
import { SpinnerIcon } from '../../Layouts/Icons/icons';

function InlineStandSpinner() {
  return (
    <div className={styles.inlineStandSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default InlineStandSpinner;
