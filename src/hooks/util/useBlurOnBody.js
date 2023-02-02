/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

/**
 * This custom hook attachs  the onClick event on the body to close modal windows on bodyClick. To do this, useBlurOnBody hook uses useState hook with the property blur, which one by default is true.  And this onClick event will be attached on the body only if 'blur' is false, and blur can be changed from the onFocus function which is returned from this hook.
 * Whenever onFocus function be executed local state "blur" will be changed from true to false, and body event will be attached. And now if you want to prevent some elements from onBodyClick event you can pass these elements classNames as a prop as an array of strings and the elements will be excluded.
 * @param {*} handleOnFocus handleOnFocus function will be executed into the onFocus function body. With help of this prop you can execute as many order as you want whenever the onFocus event occurs
 * @param {*} handleOnBlur function will be executed into the onnBodyClick function, so with help of this props you can execute as many order as you want after 'blur' state changed back to true
 * @param {*} excludeElCls must be the string, the classname of element which u want to exlude on body click
 * @returns blur = true|false. So you can use this property for condintional rendering when you want to open some window on the click and then close when user clicks outside of windw.
 * @returns 'onFocus' manipulates on 'blur' state, so you have to attach this function on the element, on which user manipulates and in this case you want to change the DOM, for example open the modal window.
 */
function useBlurOnBody(handleOnFocus, handleOnBlur, excludeElCls) {
  const [blur, setBlur] = useState(true);

  function onFocus(e) {
    handleOnFocus();
    setBlur(false);
  }

  const removeListener = () => {
    document
      .querySelector("body")
      .removeEventListener("click", onBodyClick, true);
  };

  function onBodyClick(e) {
    if (excludeElCls.some((cls) => e.target.closest(`.${cls}`))) return;
    removeListener();
    setBlur(true);
    handleOnBlur();
  }

  useEffect(() => {
    !blur &&
      document
        .querySelector("body")
        .addEventListener("click", onBodyClick, true);
  }, [blur]);

  return { blur, onFocus, removeListener };
}

export default useBlurOnBody;
