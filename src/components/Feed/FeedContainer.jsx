import styles from './styles/feedContainer.module.scss';
import { useScroll } from '../../hooks';

function Container({ children }) {
  useScroll({ target: 'window'});
  return <div className={styles.feedContainer}>{children}</div>;
}

export default Container;
