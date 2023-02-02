import { useState } from "react";
import SelectEl from "react-select";

import styles from "./select.module.scss";

function Select({
  handler,
  label,
  error,
  message,
  name,
  data = {
    default: { label: "", value: "" },
    values: [],
  },
}) {
  const [defaultValue, setDefaultValue] = useState(data.default);
  const [fieldValue, setFieldValue] = useState("");

  function generateSelectionOptions() {
    const { values } = data;

    const temp = [];

    values?.forEach((val) =>
      temp.push({
        value: val,
        label: val[0].toUpperCase().concat(val.slice(1, val.length)),
      })
    );

    return temp;
  }

  function handleSelection({ value, label }) {
    if (value) setDefaultValue(null);

    setFieldValue({ label, value });
    handler(value);
  }

  return (
    <div className={styles.selectContainer} data-select-box>
      {label && <label className={styles.inpLabel}>{label}</label>}

      <SelectEl
        name={name || ""}
        value={fieldValue || defaultValue}
        onChange={handleSelection}
        options={generateSelectionOptions()}
        classNames={{
          container: () => styles.selContainer,
          control: () => `${styles.selControl} ${error ? styles.error : ""}`,
          placeholder: () => styles.selPlaceholder,
          indicatorsContainer: () => styles.indicatorContainer,
          indicatorSeparator: () => styles.selSeparator,
          menu: () => styles.optionsContainer,
          menuList: () => styles.optionMenu,
          option: () => styles.selOption,
        }}
      />

      {error && <p className={styles.inpErrMsg}>{message}</p>}
    </div>
  );
}

export default Select;
