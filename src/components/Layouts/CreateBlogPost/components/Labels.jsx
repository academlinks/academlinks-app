import styles from "./styles/labels.module.scss";
import { CloseIcon } from "../../Icons/icons";
import { Input } from "../../";

function Labels({ addLaebel, removeLabel, label, setLabel, labels, error }) {
  return (
    <div className={styles.categoriesBox} data-blog-post-field>
      <form onSubmit={addLaebel} className={styles.labelForm}>
        <Input
          label="label"
          placeholder="#label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          id="blogPostCategories"
          type="text"
          error={error.hasError}
          message={error.message}
          name="label"
          labelTitle={`is required min 1 label and it must starts with '#'`}
          className={styles.labelField}
        />
      </form>
      <div className={styles.labelsList}>
        {labels &&
          labels?.map((label, i) => (
            <span key={`category-${i}`}>
              {label}
              <button onClick={(e) => removeLabel(label)}>
                <CloseIcon />
              </button>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Labels;
