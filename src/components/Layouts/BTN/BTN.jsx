import styles from "./btn.module.scss";

/**
 * custom button which you can controll by props
 * @param {children} childrenJSX child elements
 * @param {function} onClick  onClick function
 * @param {String} className
 * @param {type} type by default = "button". defines button type
 * @returns
 */
function BTN({
  onClick,
  children,
  disabled = false,
  type = "button",
  className,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles.btnRe} ${className || ""}`}
    >
      {children}
    </button>
  );
}

export default BTN;
