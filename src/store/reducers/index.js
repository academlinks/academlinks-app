import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import activeUserReducer from "./activeUserReducer";
import userReducer from "./userReducer";
import postsDataReducer from "./postsDataReducer";
import commentsDataReducer from "./commentsDataReducer";
import aboutReducer from "./aboutReducer";
import createPostReducer from "./createPostReducer";
import portalReducer from "./portalReducer";
import friendsReducer from "./friendsReducer";
import conversationReducer from "./conversationReducer";
import badgeReducer from "./badgeReducer";
import settingsReducer from "./settingsReducer";
import notificationReducer from "./notificationReducer";
import commercialReducer from "./commercialReducer";
import authenticationReducer from "./authenticationReducer";

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
