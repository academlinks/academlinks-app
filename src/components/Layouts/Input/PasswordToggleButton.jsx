import { useState } from "react";

import { EyeHideIcon, EyeShowIcon } from "components/Layouts/Icons";
import styles from "./input.module.scss";

function PasswordToggleButton({ setInputType }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        setShowPassword((prev) => !prev);
        setInputType((prev) => (prev === "password" ? "text" : "password"));
      }}
      className={styles.iconBox}
    >
      {!showPassword && <EyeShowIcon />}
      {showPassword && <EyeHideIcon />}
    </span>
  );
}

export default PasswordToggleButton;
