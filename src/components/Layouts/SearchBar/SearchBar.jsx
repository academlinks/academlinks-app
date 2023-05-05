import { SearchIcon } from "components/Layouts/Icons";
import styles from "./searchBar.module.scss";

function SearchBar({
  value,
  className,
  allowToggle,
  onFocus = () => {},
  onChange = () => {},
  accumulator,
  setAccumulator,
}) {
  return (
    <div
      className={`${styles.searchField} ${accumulator ? styles.active : ""} ${
        className || ""
      }`}
    >
      <input
        onFocus={() => onFocus(true)}
        onChange={onChange}
        value={value}
        type="text"
        id="search"
        placeholder="search..."
        data-search-bar-input
        className={`${styles.searchFieldInp} navigation--searchBar`}
      />
      <label
        htmlFor="search"
        className={`${styles.searchFieldLabel} nav-searchbar--btn`}
        onClick={(e) => {
          e.stopPropagation();
          allowToggle && setAccumulator((prev) => !prev);
        }}
      >
        <SearchIcon />
      </label>
    </div>
  );
}

export default SearchBar;
