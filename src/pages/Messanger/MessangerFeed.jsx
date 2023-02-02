/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import {
  selectActiveConversation,
  selectAllConversations,
} from "../../store/selectors/conversationSelectors";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { useConversationQuery } from "../../hooks";

import Feed from "../../components/Messanger/Feed";

let isValidConversation = true;

function MessangerFeed() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: conversationRoute } = useParams();

  const { deleteConversationQuery, markAsReadQuery } = useConversationQuery();

  const activeUserId = useSelector(selectActiveUserId);
  const { conversation } = useSelector(selectActiveConversation);
  const { allConversations } = useSelector(selectAllConversations);

  // SECTION: mark conversation as read
  useEffect(() => {
    if (!conversation) return;

    const lastMsg = conversation.lastMessage;

    if (
      !lastMsg ||
      lastMsg.isRead ||
      conversationRoute !== conversation._id ||
      !lastMsg.author ||
      lastMsg.author === activeUserId
    )
      return;

    markAsReadQuery({
      conversationId: conversation._id,
      adressatId: lastMsg.author,
    });
  }, [activeUserId, conversation, conversation?.messages, conversationRoute]);

  // SECTION: validate conversation
  useEffect(() => {
    if (state?.isNew && !conversation?.messages[0]) isValidConversation = false;
    else if (state?.isNew && conversation.messages[0])
      isValidConversation = true;
  }, [conversation?.messages, state?.isNew]);

  // SECTION: delete conversation on unmount if it's not valid
  /* 
  delete conversatioon if it does not contains any messages
  this happens when user opens conversation from another user profile
  and  this conversation is empty
  */
  useEffect(() => {
    return () => {
      if (state?.isNew && !isValidConversation) {
        deleteConversationQuery(conversationRoute);
      }
    };
  }, []);

  // SECTION: redirect to /messanger if there are no conversations
  useEffect(() => {
    if (!state?.isNew && !allConversations?.[0] && !conversation) {
      navigate("/messanger", { replace: true });
    }
  }, [allConversations, conversation, navigate]);

  return <Feed />;
}

export default MessangerFeed;
