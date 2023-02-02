export default function getConversationLastMsg(conversation) {
  if (!conversation?.messages[0]) return null;

  const i = conversation.messages.length - 1;
  return conversation.messages[i];
}
