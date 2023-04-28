import { SpinnerIcon } from 'components/Layouts/Icons';
import styles from './spinner.module.scss';

function InlineSpinner() {
  return (
    <div className={styles.inlineSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default InlineSpinner;
