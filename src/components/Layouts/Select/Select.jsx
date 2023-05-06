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
  const [focus, setFocus] = useState(false);

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
    <div className={styles.formSelect} data-select-box>
      {label && <label className={styles.inputLabel}>{label}</label>}

      <SelectEl
        name={name || ""}
        value={fieldValue || defaultValue}
        onChange={handleSelection}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        options={generateSelectionOptions()}
        classNames={{
          container: () => styles.selectContainer,
          control: () =>
            `${styles.selectControl} ${error ? styles.error : ""} ${
              focus ? styles.focused : ""
            }`,
          placeholder: () => styles.selectPlaceholder,
          indicatorsContainer: () => styles.indicatorContainer,
          indicatorSeparator: () => styles.selectSeparator,
          menu: () => styles.optionsContainer,
          menuList: () => styles.optionMenu,
          option: () => styles.selectOption,
        }}
      />

      {error && <p className={styles.errorMessage}>{message}</p>}
    </div>
  );
}

export default Select;
