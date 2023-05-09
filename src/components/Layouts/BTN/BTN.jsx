import styles from "./btn.module.scss";

/**
 * custom button which you can controll by props
 * @param {children} childrenJSX child elements
 * @param {function} onClick  onClick function
 * @param {String} className
 * @param {type} type by default = "button". defines button type
 * @param {type} btnType by default = "primary". primary | primaryCube
 * @returns
 */
function BTN({
  children,
  type = "button",
  btnType = "primary",
  onClick,
  disabled = false,
  className,
}) {
  const btnTypeClass =
    btnType === "primary"
      ? styles.primary
      : btnType === "primaryRadial"
      ? styles.primaryRadial
      : btnType === "secondary"
      ? styles.secondary
      : btnType === "secondaryRadial"
      ? styles.secondaryRadial
      : btnType === "delete"
      ? styles.delete
      : btnType === "deleteRadial"
      ? styles.deleteRadial
      : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles.btnRe} ${btnTypeClass} ${className || ""}`}
      data-button-re
    >
      {children}
    </button>
  );
}

export default BTN;
