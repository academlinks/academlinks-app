import styles from './components/styles/container.module.scss';

function MessangerContainer({ children }) {
  return <div className={styles.messangerContainer}>{children}</div>;
}

export default MessangerContainer;
