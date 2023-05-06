import { getConversationLastMessage } from "./";

export default function getLastMessageDateCreation({ conversation }) {
  return new Date(
    getConversationLastMessage(conversation)?.createdAt
  ).getTime();
}
