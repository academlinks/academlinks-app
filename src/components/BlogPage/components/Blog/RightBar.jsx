import styles from './styles/rightBar.module.scss';
import TopRatedPublishers from './TopRatedPublishers';
import TopRatedPosts from './TopRatedPosts';

function RightBar() {
  return (
    <div className={styles.rightBar}>
      <div className={styles.rightBarBox}>
        <h4 className={styles.rightBarTitle}>top rated publishers</h4>
        <TopRatedPublishers />
      </div>
      <div className={`${styles.rightBarBox} ${styles.topRatedPostsBox}`}>
        <h4 className={styles.rightBarTitle}>top rated posts</h4>
        <TopRatedPosts />
      </div>
    </div>
  );
}

export default RightBar;
