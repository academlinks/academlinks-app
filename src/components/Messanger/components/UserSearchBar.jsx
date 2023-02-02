import { useSelector } from "react-redux";

import { useUserSearch, useConversationQuery } from "../../../hooks";
import { selectSearchLoadingState } from "../../../store/selectors/userSelectors";
import { extractRootEndPointFromImg } from "../../../lib";

import { SearchBar, Spinner, Error } from "../../Layouts";
import styles from "./styles/userSearchBar.module.scss";

function UserSearchBar() {
  const { loading, error, message } = useSelector(selectSearchLoadingState);
  const { createNewConversation } = useConversationQuery();

  const {
    key,
    setKey,
    activeWindow,
    setActiveWindow,
    onFocus,
    blur,
    result,
    onChooseHandler,
  } = useUserSearch({
    blurClassNames: [
      "navigation--searchBar",
      "searchbar-window",
      "nav-searchbar--btn",
    ],
  });

  async function handler(id) {
    onChooseHandler();
    await createNewConversation(id);
  }

  return (
    <div className={styles.userSearchBar}>
      <SearchBar
        allowToggle={true}
        accumulator={activeWindow}
        setAccumulator={setActiveWindow}
        onFocus={onFocus}
        onChange={(e) => setKey(e.target.value)}
        value={key}
      />

      {activeWindow && !blur && (
        <div
          className={`${styles.userSearchBarModal} ${
            loading ? "" : styles.fullFieldModal
          } searchbar-window`}
        >
          {loading && <Spinner />}

          {error && <Error msg={message} className={styles.searchError} />}

          {!loading &&
            !error &&
            result.map((user) => (
              <div
                className={styles.searchBarItem}
                key={user._id}
                onClick={() => handler(user._id)}
              >
                <figure className={styles.searchBarItemFig}>
                  <img
                    src={extractRootEndPointFromImg(user.profileImg)}
                    alt={user.userName}
                  />
                </figure>
                <p className={styles.searchBarItemUserName}>{user.userName}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default UserSearchBar;
