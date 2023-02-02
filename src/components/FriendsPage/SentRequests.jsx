/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

import { useFriendsQuery, useScroll } from "../../hooks";
import { selectSentRequestsPageState } from "../../store/selectors/friendsSelector";

import styles from "./components/styles/request.module.scss";
import { CancelRequestBTN, Error, EmptyContentMessage } from "../Layouts";
import RequestItemBody from "./components/RequestItemBody";

function SentRequests() {
  const {
    sentRequests,
    searchKey,
    requestError: { error, task, message },
  } = useSelector(selectSentRequestsPageState);

  const { cancelFriendRequestQuery, handleResetRequestError } =
    useFriendsQuery();

  useScroll({ target: "elem", scrollTo: "nested-sent--requests__page" });

  return (
    <div className={styles.requestsList} id="nested-sent--requests__page">
      {sentRequests[0] &&
        sentRequests
          .filter((adressat) => {
            if (!searchKey) return adressat;
            else return adressat.userName.includes(searchKey);
          })
          .map((adressat) => (
            <RequestItemBody
              key={adressat._id}
              img={adressat.profileImg}
              userName={adressat.userName}
              userId={adressat._id}
              muntuals={adressat.muntuals}
            >
              <CancelRequestBTN
                onClick={() => cancelFriendRequestQuery(adressat._id)}
              />
            </RequestItemBody>
          ))}
      {error && ["cancel"].includes(task) && (
        <Error msg={message} asModal={true} onClose={handleResetRequestError} />
      )}
      {!sentRequests[0] && !error && (
        <EmptyContentMessage
          message="you don't have sent requests yet"
          className={styles.emptyRequestsMessage}
        />
      )}
    </div>
  );
}

export default SentRequests;
