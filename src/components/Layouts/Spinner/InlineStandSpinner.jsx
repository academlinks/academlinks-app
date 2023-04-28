import { SpinnerIcon } from 'components/Layouts/Icons';
import styles from './spinner.module.scss';

function InlineStandSpinner() {
  return (
    <div className={styles.inlineStandSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default InlineStandSpinner;
