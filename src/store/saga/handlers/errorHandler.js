import { put } from "redux-saga/effects";

export function* showError({ error, location, setter, setterParams }) {
  if (setter)
    yield put(
      setter({
        ...setterParams,
        message: error?.response?.data?.message || setterParams.message,
      })
    );

  if (process.env.REACT_APP_ENV_MODE !== "DEV") return;

  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error?.response?.data?.message || error.message,
    err: error,
    stack: error.stack,
  });
}

export function* triggerError(loadMs = 0) {
  yield new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("triggered new error"));
    }, loadMs);
  });
}

export function* triggerLoading(ms = 1000) {
  yield new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export const errorMessages = {
  settings: {
    update: "can't update information. please try again later.",
    load: "Occured error during loading data. Please try again later.",
  },
  user: {
    load: "Occured error during loading data. Please try again later.",
    operation: "Occured error during operation. Please try again later.",
    sendRegRequest: "Something went wrong. Please try again later.",
    auth: "Occured error during authentication. Please try again later.",
  },
  notifications: {
    load: "Occured error during loading data. Please try again later.",
    delete:
      "Occured error during deleting notification. Please try again later.",
    deleteAll:
      "Occured error during deleting notifications. Please try again later.",
    mark: "Occured error during operation. Please try again later.",
    markAll: "Occured error during operation. Please try again later.",
  },
  conversation: {
    load: "Occured error during loading data. Please try again later.",
    singleConversation:
      "Occured error during loading conversation. Please try again later.",
    send: "Occured error during sending message. Please try again later.",
    operation: "Occured error during operation. Please try again later.",
    deletion:
      "Occured error during deleting conversation. Please try again later.",
  },
  post: {
    load: "Occured error during loading data. Please try again later.",
    operation: "Occured error during operation. Please try again later.",
    create: "Occured error during post creation. Please try again later.",
    deletion: "Occured error during deleting post. Please try again later.",
    audience:
      "Occured error during changing post audience. Please try again later.",
    save: "Occured error during saving post. Please try again later.",
    addToProfile:
      "Occured error during adding post to profile. Please try again later.",
    hide: "Occured error during hiding post from profile. Please try again later.",
    removeTag:
      "Occured error during removing tag from post. Please try again later.",
    sharePost: "Occured error during post share. Please try again later.",
    updatePost: "Occured error during post update. Please try again later.",
  },
  comments: {
    load: "Occured error during loading comments. Please try again later.",
    add: "Occured error during adding comment. Please try again later.",
    addReply:
      "Occured error during adding comment reply. Please try again later.",
    update: "Occured error during update comment. Please try again later.",
    updateReply:
      "Occured error during update comment reply. Please try again later.",
    deletion: "Occured error during deleting comment. Please try again later.",
    deletionReply:
      "Occured error during deleting comment reply. Please try again later.",
    pin: "Occured error during pinning comment. Please try again later.",
    pinReply:
      "Occured error during pinning comment reply. Please try again later.",
  },
  requests: {
    send: "Occured error during sending friend request. Please try again later.",
    cancel:
      "Occured error during canceling friend request. Please try again later.",
    confirm:
      "Occured error during confirm friend request. Please try again later.",
    deletion:
      "Occured error during deleting friend request. Please try again later.",
    remove: "Occured error during deleting friend. Please try again later.",
    load: "Occured error during loading data. Please try again later.",
  },
};
