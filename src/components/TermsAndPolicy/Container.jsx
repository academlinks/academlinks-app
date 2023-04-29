import styles from "./styles/container.module.scss";

function Container({ children }) {
  return <div className={styles.termsAndPolicyContainer}>{children}</div>;
}

export default Container;
