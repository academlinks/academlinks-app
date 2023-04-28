import { useSelector } from "react-redux";

import { useFriendsQuery, useConversationQuery } from "hooks/queries";
import { selectRequestError } from "store/selectors/friendsSelector";

import {
  DeleteRequestBTN,
  CancelRequestBTN,
  ConfirmRequestBtn,
  SendRequestBTN,
  IsFriendBTN,
  SendMessageBTN,
  Error,
} from "components/Layouts";
import styles from "./styles/friendShip.module.scss";

function FriendShip({ friendShip, profileId, setFriendShip }) {
  const {
    sendFriendRequestQuery,
    cancelFriendRequestQuery,
    deleteFriendRequestQuery,
    confirmFriendRequestQuery,
    deleteFriendQuery,
    handleResetRequestError,
  } = useFriendsQuery();

  const { createNewConversation } = useConversationQuery();

  const {
    error,
    // task,
    message,
  } = useSelector(selectRequestError);

  return (
    <div className={styles.friendShipBTNBox}>
      {friendShip?.isFriend && (
        <IsFriendBTN
          deleteHanlder={() => {
            deleteFriendQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isFriend: false,
              isForeign: true,
            }));
          }}
        />
      )}
      {friendShip?.isForeign && (
        <SendRequestBTN
          onClick={() => {
            sendFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isSentRequest: true,
              isForeign: false,
            }));
          }}
        />
      )}
      {friendShip?.isPendingRequest && (
        <ConfirmRequestBtn
          onClick={() => {
            confirmFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isPendingRequest: false,
              isFriend: true,
            }));
          }}
        />
      )}
      {friendShip?.isPendingRequest && (
        <DeleteRequestBTN
          onClick={() => {
            deleteFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isPendingRequest: false,
              isForeign: true,
            }));
          }}
        />
      )}
      {friendShip?.isSentRequest && (
        <CancelRequestBTN
          onClick={() => {
            cancelFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isSentRequest: false,
              isForeign: true,
            }));
          }}
        />
      )}
      <SendMessageBTN onClick={() => createNewConversation(profileId)} />
      {error && (
        <Error msg={message} asModal={true} onClose={handleResetRequestError} />
      )}
    </div>
  );
}

export default FriendShip;
