import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { extractRootEndPointFromImg } from "lib";
import {
  selectTopRatedPublishers,
  selectTopRatedPublishersLoadingState,
} from "store/selectors/postSelectors";

import styles from "./styles/topRatedPublishers.module.scss";
import { Image, Spinner, Error } from "components/Layouts";

function TopRatedPublishers() {
  const { state: pathState } = useLocation();

  const publishers = useSelector(selectTopRatedPublishers);
  const { loading, error, message } = useSelector(
    selectTopRatedPublishersLoadingState
  );

  return (
    <ul className={styles.topRatedPublishers}>
      {loading && <Spinner />}
      {!loading &&
        !error &&
        publishers?.map((publisher) => (
          <li className={styles.topRatedPublisher} key={publisher._id}>
            <Link
              to={""}
              state={{
                ...pathState,
                author: pathState?.author
                  ? pathState.author === publisher._id
                    ? ""
                    : publisher._id
                  : publisher._id,
              }}
              className={
                pathState?.author === publisher._id ? styles.activeLink : ""
              }
            >
              <Image
                src={extractRootEndPointFromImg(publisher.author.profileImg)}
                className={styles.userImg}
              />
              <span className={styles.details}>
                <h3 className={styles.userName}>{publisher.author.userName}</h3>
                <span className={styles.postsAmount}>
                  {publisher.posts} blog posts
                </span>
              </span>
            </Link>
          </li>
        ))}
      {error && <Error msg={message} />}
    </ul>
  );
}

export default TopRatedPublishers;
