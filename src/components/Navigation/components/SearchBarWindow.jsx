import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectSearchLoadingState } from "store/selectors/userSelectors";

import styles from "./styles/searchBarWindow.module.scss";
import { Avatar, Spinner, Error } from "components/Layouts";

function SearchBarWindow({ result, onChooseHandler }) {
  const { loading, error, message } = useSelector(selectSearchLoadingState);

  return (
    <div
      className={`${styles.searchWindow}  searchbar-window`}
      data-searchbar-window
    >
      {loading && <Spinner />}

      {!loading && !error && (
        <div className={styles.resultsList} data-searchbar-result-list>
          {result?.map((result) => (
            <Link
              to={`/profile/${result._id}/posts`}
              key={result._id}
              className={styles.resultsListItem}
              onClick={onChooseHandler}
            >
              <Avatar img={result.profileImg} />
              <span>{result.userName}</span>
            </Link>
          ))}
        </div>
      )}
      
      {error && <Error msg={message} className={styles.searchError} />}
    </div>
  );
}

export default SearchBarWindow;
