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

  return messages
    .map((msg, i, chat) => {
      if (
        (chat[i + 1] && msg?.author === chat[i + 1]?.author) ||
        msg?.author === chat[i - 1]?.author
      ) {
        if (group[0] && group[0].author !== msg.author) return copyAndDelete(msg);
        else group.push(msg);
      } else if (msg.author !== chat[i - 1]?.author && group[0]) return copyAndDelete(msg);
      else return copyAndDelete(msg);
      // else if (group[0] && group[0].author === msg.author) {
      //   group.push(msg);
      //   return copyAndDelete();
      // }
    })
    .filter((msgBlock) => Array.isArray(msgBlock) && msgBlock.length >= 1)
    .concat([group]);
}
