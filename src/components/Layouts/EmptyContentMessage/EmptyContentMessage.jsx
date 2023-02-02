import styles from "./emptyContentMessage.module.scss";

function EmptyContentMessage({ message, className }) {
  return <p className={`${styles.message} ${className || ""}`}>{message}</p>;
}

export default EmptyContentMessage;
