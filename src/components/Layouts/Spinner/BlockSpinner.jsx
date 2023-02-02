import styles from './spinner.module.scss';
import { SpinnerIcon } from '../../Layouts/Icons/icons';

function BlockSpinner() {
  return (
    <div className={styles.blockSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default BlockSpinner;
