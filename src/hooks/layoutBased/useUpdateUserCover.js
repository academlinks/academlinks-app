/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { axiosFormDataQuery } from "store/axiosConfig";
import { selectActiveUserId } from "store/selectors/activeUserSelectors";
import { setActiveUserUpdatedCover } from "store/reducers/postsDataReducer";
import { setUpdatedUserCover } from "store/reducers/activeUserReducer";

function useUpdateUserCover(field, setUpdateUserMedia) {
  const dispatch = useDispatch();

  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const activeUserId = useSelector(selectActiveUserId);

  async function saveChangeHandler() {
    try {
      setLoading(true);
      if (field === "profileImg") {
        const { data } = await axiosFormDataQuery.post(
          `/user/${activeUserId}/profile/profileImg`,
          {
            profileImg: file,
          }
        );
        dispatch(setUpdatedUserCover({ field, value: data }));
        dispatch(setActiveUserUpdatedCover(data));
      } else if (field === "coverImg") {
        const { data } = await axiosFormDataQuery.post(
          `/user/${activeUserId}/profile/coverImg`,
          {
            coverImg: file,
          }
        );
        dispatch(setUpdatedUserCover({ field, value: data }));
      }
    } catch (error) {
    } finally {
      if (fileRef.current) fileRef.current.value = "";
      setFile(null);
      setLoading(false);
    }
  }

  function cancelChangeHandler() {
    fileRef.current.value = "";
    setFile(null);
  }

  useEffect(() => {
    if (!file)
      return setUpdateUserMedia({
        isProccessing: false,
        saveChangeHandler: () => {},
        cancelChangeHandler: () => {},
      });

    setUpdateUserMedia({
      isProccessing: true,
      saveChangeHandler,
      cancelChangeHandler,
    });
  }, [file]);

  return { fileRef, file, setFile, loading };
}

export default useUpdateUserCover;
