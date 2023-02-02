import styles from "./components/styles/profileReviewContainer.module.scss";

function ProfileReviewContainer({ children }) {
  return <div className={styles.profileReviewContainer}>{children}</div>;
}

export default ProfileReviewContainer;
