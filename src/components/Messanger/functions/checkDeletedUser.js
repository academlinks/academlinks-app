export default function checkDeletedUser(conversation, activeUserId) {
  return (
    conversation.deletedUsers &&
    conversation.deletedUsers.some(
      (u) => u.isDeleted && u.cachedUserId !== activeUserId
    )
  );
}
