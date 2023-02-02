import { useRef } from "react";
import { useDispatch } from "react-redux";

import {
  // deActivateTarget,
  getUserAboutData,
} from "../../store/reducers/aboutReducer";

// import { destructureFormData } from "../../lib";

// const formTypes = {
//   education: formatEducation,
//   workplace: formatWorkplace,
//   standart: formatStandart,
// };

/**
 * custom hook which is ensuring to send user data to DB properly from one place for all info blocks
 * @param {type} type defines which kind of information block have to be handled. and it is necessery to pass the type prop only if you're gonna handle the education or workplace blocks, because of they contain nested fields and in the case to send information to DB in correct form it is neccessery to format data manually. in other cases it is not required to pass the type prop
 * @returns cancelUpdate handler function which have to be passed on cancel button, confirmUpdate handler function which have to be passed on confirm button or on the form(onSubmit) and formRef which one have to be passed on the actual form element to work properly
 */
function useAboutUserQuery(type) {
  const dispatch = useDispatch();
  const formRef = useRef();

  function getAboutUserQuery(userId) {
    dispatch(getUserAboutData(userId));
  }

  return { getAboutUserQuery, formRef };
}

export default useAboutUserQuery;
