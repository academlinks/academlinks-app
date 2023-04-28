import { useUserSearch } from "hooks/queries";

import { SearchBarWindow } from "./";
import { SearchBar } from "components/Layouts";
import styles from "./styles/navSearchBar.module.scss";

function NavSearchBar() {
  const {
    key,
    setKey,
    activeWindow,
    setActiveWindow,
    onFocus,
    blur,
    onChooseHandler,
    result,
  } = useUserSearch({
    blurClassNames: [
      "navigation--searchBar",
      "searchbar-window",
      "nav-searchbar--btn",
    ],
  });

  return (
    <div
      className={`${styles.mainNavSearch} ${activeWindow ? styles.active : ""}`}
    >
      <SearchBar
        allowToggle={true}
        accumulator={activeWindow}
        setAccumulator={setActiveWindow}
        onFocus={onFocus}
        onChange={(e) => setKey(e.target.value)}
        value={key}
        className={styles.mainNavSearchBar}
      />
      {activeWindow && !blur && (
        <SearchBarWindow result={result} onChooseHandler={onChooseHandler} />
      )}
    </div>
  );
}

export default NavSearchBar;
