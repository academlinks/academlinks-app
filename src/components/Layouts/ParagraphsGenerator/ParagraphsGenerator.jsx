import { createTextBox } from "../../../lib";
import styles from "./paragraphsGenerator.module.scss";

function ParagraphsGenerator({ text }) {
  return (
    <div className={styles.generatorContainer}>
      {createTextBox({
        str: text,
        parentClass: styles.pParent,
        childClass: styles.pChild,
      })}
    </div>
  );
}

export default ParagraphsGenerator;
