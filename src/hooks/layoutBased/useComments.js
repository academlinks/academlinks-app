import { useReducer } from "react";

function useComments() {
  const [state, dispatch] = useReducer(threadReducer, {
    parentAuthor: {},
    commentId: "",
    replyId: "",
    text: "",
    updateParent: false,
    updateReply: false,
    activeReply: false,
    showReplies: false,
  });

  const setCommentReply = ({ commentId, tag }) =>
    dispatch({
      type: "SET_COMMENT_REPLY",
      payload: { commentId, tag },
    });

  const setUpdateComment = ({ commentId, replyId, text, tags, type }) =>
    dispatch({
      type: "SET_UPDATE_COMMENT",
      payload: { commentId, replyId, text, tags, type: type },
    });

  const resetCommentCredentials = () =>
    dispatch({ type: "RESET_COMMENT_CREDENTIALS" });

  function handleShowReplies(parentAuthor) {
    if (state.activeReply) dispatch({ type: "RESET_COMMENT_REPLY" });
    else if (state.updateReply) {
      dispatch({ type: "RESET_UPDATE_COMMENT" });
      state.showReplies &&
        dispatch({ type: "SET_SHOW_REPLIES", payload: { open: false } });
    } else
      dispatch({
        type: "SET_SHOW_REPLIES",
        payload: { open: !state.showReplies, parentAuthor },
      });
  }

  const setCommentText = (txt) =>
    dispatch({ type: "SET_COMMENT_TEXT", payload: JSON.stringify(txt) });

  return {
    state,
    setCommentReply,
    // removeTag,
    setUpdateComment,
    resetCommentCredentials,
    handleShowReplies,
    // setTag,
    setCommentText,
  };
}

export default useComments;

function threadReducer(state, { type, payload }) {
  function fillUpTags({ _id, userName }) {
    const draft = [...state.tags];
    const temp = { _id, userName };

    if (!draft.some((tag) => tag._id === temp._id)) draft.push(temp);

    return draft;
  }

  switch (type) {
    case "SET_COMMENT_TEXT":
      return {
        ...state,
        text: payload,
      };
    case "SET_SHOW_REPLIES":
      return {
        ...state,
        showReplies: payload.open,
        parentAuthor: payload.open ? payload.parentAuthor : {},
      };

    case "SET_COMMENT_REPLY": {
      const draft = payload.tag ? fillUpTags(payload.tag) : [];
      return {
        ...state,
        showReplies: true,
        commentId: payload.commentId,
        activeReply: true,
        tags: [...draft],
      };
    }

    case "RESET_COMMENT_REPLY":
      return {
        ...state,
        tags: [],
        commentId: "",
        activeReply: false,
        showReplies: false,
      };

    case "SET_UPDATE_COMMENT":
      return {
        ...state,
        activeReply: false,
        tags: payload.tags,
        commentId: payload.commentId,
        replyId: payload.replyId,
        text: payload.text,
        [payload.type]: true,
        [payload.type === "updateParent"
          ? "updateReply"
          : "updateParent"]: false,
      };

    case "RESET_UPDATE_COMMENT":
      return {
        ...state,
        commentId: "",
        replyId: "",
        text: "",
        updateParent: false,
        updateReply: false,
        tags: [],
      };

    case "RESET_COMMENT_CREDENTIALS":
      return {
        ...state,
        replyId: "",
        commentId: "",
        text: "",
        updateParent: false,
        updateReply: false,
        activeReply: false,
      };

    default:
      return state;
  }
}
