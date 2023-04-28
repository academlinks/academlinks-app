import { createContext, useState } from "react";
import { io } from "socket.io-client";
import { getAPI_Origin } from "lib/config";

const initialState = {
  socket: null,
  connection: async () => {},
  socket_name_placeholders: {
    userConnection: "",
    userDisconnection: "",
    // FOR USERS
    receiveNewFriendRequest: "",
    receiveNewNotification: "",
    receiveNewMessage: "",
    messageIsRead: "",
  },
};

export const IoContext = createContext(initialState);

export const socket_name_placeholders = {
  // BASIC
  userConnection: "user_connection",
  userDisconnection: "user_disconnection",
  // FOR USERS
  receiveNewFriendRequest: "receive_new_friend_request",
  receiveNewNotification: "receive_new_notification",
  receiveNewMessage: "receive_new_message",
  messageIsRead: "receive_message_isRead",
};

export const IoProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  async function establishIoConnection() {
    const HOST = getAPI_Origin();

    const socketIo = io(HOST, {
      transports: ["websocket"],
    });

    setSocket(socketIo);

    return socketIo;
  }

  async function connection(activeUser) {
    try {
      const s = await establishIoConnection();
      s.emit(socket_name_placeholders.userConnection, activeUser);
    } catch (error) {
    }
  }

  return (
    <IoContext.Provider
      value={{ socket, connection, socket_name_placeholders }}
    >
      {children}
    </IoContext.Provider>
  );
};
