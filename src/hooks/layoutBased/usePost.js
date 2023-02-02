import { useDispatch } from "react-redux";

import {
  setMediaModalOpen,
  // setUpdatePostModalOpen,
  setSharePostModalOpen,
} from "../../store/reducers/portalReducer";

import useCreatePost from "./useCreatePost";

/**
 * From the post is accessable three kind of modal. They are:
 * 1. modal for active post media files;
 * 2. modal for update post;
 * 3. modal for share post
 *
 * - All of these modals are located into the root <RestrictionUnAuthorised/> which is the parent Component for all the components wich are available for authorised user. In the case to activate one of them on correct time and correct place we are using redux to send them the signal. Functions returned from this custom hook helps us to send the specific signal for the specific modal like media, update and share modals. After all these functions is like a transport to give access to specific modal to the corresponding data
 * @returns > activatePostMediaHandler, activateUpdatePostModal, activateSharePostModal
 */
function usePost() {
  const dispatch = useDispatch();

  const { handleUpdatePostModalOpen } = useCreatePost({
    key: "post",
    error: null,
  });

  /**
   * passed on mediaFiles as onClick event and activates postMedia Modal
   * @param {Number} i returned from media element itself and describes clicked media index
   * @param {Array} i returned from media element itself and describes clicked media index
   * @returns
   */
  const activatePostMediaHandler = (i, media) =>
    dispatch(setMediaModalOpen({ index: i, media }));

  /**
   * sends post information to redux-state, and then from redux this information will be taken from UpdatePostPortal and autofills the corresponding fields
   */
  const activateUpdatePostModal = (data) => handleUpdatePostModalOpen(data);

  /**
   * sends post information to redux-state, and then from redux this information will be taken from SharePostPortal and autofills the corresponding fields
   */
  const activateSharePostModal = (data) =>
    dispatch(setSharePostModalOpen(data));

  return {
    activatePostMediaHandler,
    activateUpdatePostModal,
    activateSharePostModal,
  };
}

export default usePost;
