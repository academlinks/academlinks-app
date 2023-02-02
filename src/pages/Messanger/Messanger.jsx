/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useParams, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectNewConversationAlert,
  selectAllConversations,
} from "../../store/selectors/conversationSelectors";

import { selectMessageCount } from "../../store/selectors/badgeSelectors";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { IoContext } from "../../store/Io";
import { useConversationQuery, useBadgeQuery, useDocTitle } from "../../hooks";

import MessangerContainer from "../../components/Messanger/MessangerContainer";
import SideBar from "../../components/Messanger/SideBar";
// import Feed from "../../components/Messanger/Feed";

function Messanger() {
  useDocTitle("Messanger");

  const { socket, socket_name_placeholders } = useContext(IoContext);

  const activeUserId = useSelector(selectActiveUserId);

  const { id } = useParams();
  const { state } = useLocation();
  const isRedirectedNew = state?.isNew;

  const [isMounting, setIsMounting] = useState(true);

  const unseenConversationsCount = useSelector(selectMessageCount);

  const { allConversations, allConversationState } = useSelector(
    selectAllConversations
  );

  const { isNew, id: newConversationId } = useSelector(
    selectNewConversationAlert
  );

  const {
    // API Tasks
    getAllConversationsQuery,
    // getLastConversationQuery,
    getConversationQuery,
    getNewConversationQuery,
    // Non API Tasks
    handleResetConversations,
    handleSetNewMessage,
    handleMarkAsRead,
  } = useConversationQuery();

  const { resetUnseenConversationsCountQuery } = useBadgeQuery();

  // SECTION: fetches all conversations on component mount and resets them on component unmount
  useEffect(() => {
    setIsMounting(false);
    getAllConversationsQuery();
    return () => handleResetConversations();
  }, []);

  // SECTION: reset unseen conversations count
  useEffect(() => {
    if (
      !allConversationState.error &&
      !allConversationState.loading &&
      !isMounting &&
      unseenConversationsCount > 0
    )
      resetUnseenConversationsCountQuery(activeUserId);
  }, [allConversationState.loading]);

  // SECTION: get last conversation for default or get active conversation
  /* 
  this component is used in two cases 
  1. when user recently is redirected into the messanger and and the active conversation is not chosen yet Page fetches active user last conversation automaticaly with userID
  2. and when user stands on specific conversation. in that case conversation is fetched by conversationID
   */
  useEffect(() => {
    // if (
    //   !id &&
    //   !allConversationState.loading &&
    //   !allConversationState.error &&
    //   allConversations[0]
    // ) {
    //   getLastConversationQuery();
    // }

    if (
      (id &&
        !allConversationState.loading &&
        !allConversationState.error &&
        allConversations[0]) ||
      (id && isRedirectedNew)
    ) {
      getConversationQuery(id);
    }
  }, [id, allConversationState.loading]);

  // SECTION: get new conversation label on NEW Alert
  /*
  new alert is set in two cases:
  1. in first case NEW alert comes when socket gets new message which one belongs to conversation which is not yet into the conversations list.
  2. in second use case NEW alert comes from pathname. thats happens when new conversation is created from messanger searchbar
    */
  useEffect(() => {
    if (isNew || isRedirectedNew)
      getNewConversationQuery(newConversationId || id);
  }, [isNew, isRedirectedNew]);

  // SECTION: socket
  useEffect(() => {
    if (!socket) return;

    socket.on(socket_name_placeholders.receiveNewMessage, (data) => {
      handleSetNewMessage(data);
    });

    socket.on(socket_name_placeholders.messageIsRead, (data) => {
      handleMarkAsRead(data);
    });

    return () => {
      socket.off(socket_name_placeholders.receiveNewMessage);
      socket.off(socket_name_placeholders.messageIsRead);
    };
  }, [socket]);

  return (
    <MessangerContainer>
      <SideBar />
      {/* {!id && <Feed />} */}
      <Outlet />
    </MessangerContainer>
  );
}

export default Messanger;
