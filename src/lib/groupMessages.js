/* eslint-disable array-callback-return */
export default function groupMessages(messages) {
  if (!messages || !messages[0]) return [];

  let group = [];
  let groupedChat = [];

  function copyAndDelete(message) {
    groupedChat = [...group];
    group = [];
    if (message) group.push(message);
    return groupedChat;
  }

  const followingMsgAuthorIsSame = (chat, msg, i) =>
    chat[i + 1] && msg?.author === chat[i + 1]?.author;

  const prevMsgAuthorIsSame = (chat, msg, i) =>
    msg?.author === chat[i - 1]?.author;

  const prevMsgAuthorIsDifferent = (chat, msg, i) =>
    msg?.author !== chat[i - 1]?.author;

  const isGroupedDifferentAuthor = (msg) => group[0].author !== msg.author;

  const dateDifferenceIsGreaterThenAnHour = (chat, msg, i) => {
    const anHour = 1000 * 60 * 60;

    const prevMsg = i - 1 > 0 ? chat[i - 1] : null;
    const prevMsgDate = prevMsg
      ? new Date(prevMsg.createdAt).getTime()
      : undefined;

    const currMsgDate = new Date(msg.createdAt).getTime();

    const dateDifferenceBetweenCurrAndPrev = currMsgDate - prevMsgDate;
    const diffIsGreaterThenHour = dateDifferenceBetweenCurrAndPrev > anHour;

    return { diffIsGreaterThenHour, startDate: msg.createdAt };
  };

  const configuredMessagesGroup = messages
    .flatMap((msg, i, chat) => {
      const { diffIsGreaterThenHour, startDate } =
        dateDifferenceIsGreaterThenAnHour(chat, msg, i);
      if (diffIsGreaterThenHour || i === 0) return [{ startDate }, msg];
      else return msg;
    })
    .map((msg, i, chat) => {
      if (
        followingMsgAuthorIsSame(chat, msg, i) ||
        prevMsgAuthorIsSame(chat, msg, i)
      ) {
        if (group[0] && isGroupedDifferentAuthor(msg))
          return copyAndDelete(msg);
        else group.push(msg);
      } else if (prevMsgAuthorIsDifferent(chat, msg, i) && group[0])
        return copyAndDelete(msg);
      else return copyAndDelete(msg);
    })
    .filter((msgBlock) => Array.isArray(msgBlock) && msgBlock.length >= 1)
    .concat([group]);

  return configuredMessagesGroup;
}
