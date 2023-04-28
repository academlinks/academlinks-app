import { useScroll } from 'hooks/util';

import styles from './styles/feedContainer.module.scss';

function Container({ children }) {
  useScroll({ target: 'window'});
  return <div className={styles.feedContainer}>{children}</div>;
}

export default Container;
