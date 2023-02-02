import styles from './components/styles/postsPageSideBar.module.scss';
import UserInfo from './components/PostsPageUserInfo';
import PostsPageUserFriends from './components/PostsPageUserFriends';

function PostsPageSideBar() {
  return (
    <div className={styles.postsPageSideBar}>
      <UserInfo />
      <PostsPageUserFriends />
    </div>
  );
}

export default PostsPageSideBar;
