export default function getConversationLastMessage(conversation) {
  if (!conversation?.messages[0]) return null;

  const i = conversation.messages.length - 1;
  
  return conversation.messages[i];
}
