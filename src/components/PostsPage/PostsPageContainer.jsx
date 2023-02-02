import styles from './components/styles/postsPageContainer.module.scss';
import { useScroll } from '../../hooks';

function PostsPageContainer({ children }) {
  useScroll({ target: 'window' });
  return <div className={styles.postsPageContainer}>{children}</div>;
}

export default PostsPageContainer;
