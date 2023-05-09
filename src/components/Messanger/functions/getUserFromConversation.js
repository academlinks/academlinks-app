import { checkDeletedUser } from ".";

export default function getUserFromConversation({
  conversation,
  activeUserId,
}) {
  const isDeletedUser = checkDeletedUser(conversation, activeUserId);
  const user = isDeletedUser
    ? conversation.deletedUsers.find(
        (u) => u.isDeleted && u.cachedUserId !== activeUserId
      )
    : conversation.users.find((user) => user._id !== activeUserId);

  const userId = isDeletedUser ? user.cachedUserId : user._id;

  return { user, userId };
}
