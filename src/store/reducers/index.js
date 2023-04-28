import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import activeUserReducer from "store/reducers/activeUserReducer";
import userReducer from "store/reducers/userReducer";
import postsDataReducer from "store/reducers/postsDataReducer";
import commentsDataReducer from "store/reducers/commentsDataReducer";
import aboutReducer from "store/reducers/aboutReducer";
import createPostReducer from "store/reducers/createPostReducer";
import portalReducer from "store/reducers/portalReducer";
import friendsReducer from "store/reducers/friendsReducer";
import conversationReducer from "store/reducers/conversationReducer";
import badgeReducer from "store/reducers/badgeReducer";
import settingsReducer from "store/reducers/settingsReducer";
import notificationReducer from "store/reducers/notificationReducer";
import commercialReducer from "store/reducers/commercialReducer";
import authenticationReducer from "store/reducers/authenticationReducer";

const persistedActvieUserConfig = {
  key: "ActiveUser",
  version: 1,
  storage,
  blacklist: ["loadingState"],
};

const persistedActiveUser = persistReducer(
  persistedActvieUserConfig,
  activeUserReducer
);

export const rootReducer = combineReducers({
  activeUser: persistedActiveUser,
  user: userReducer,
  postsData: postsDataReducer,
  commentsData: commentsDataReducer,
  aboutUser: aboutReducer,
  createPost: createPostReducer,
  portal: portalReducer,
  friends: friendsReducer,
  conversation: conversationReducer,
  badges: badgeReducer,
  settings: settingsReducer,
  notifications: notificationReducer,
  commercials: commercialReducer,
  authentication: authenticationReducer,
});
