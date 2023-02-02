/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';

function useScroll({ target = 'window', options = {}, scrollTo }) {
  const windowScrollOptions = useMemo(
    () => ({
      top: 0,
      left: 0,
      behavior: 'instant',
    }),
    []
  );

  const elemScrollOptions = useMemo(
    () => ({
      block: 'center',
      behavior: 'smooth',
    }),
    []
  );

  useEffect(() => {
    if (target === 'window') return window.scrollTo({ ...windowScrollOptions, ...options });
    else if (target === 'elem')
      return document
        .getElementById(scrollTo)
        ?.scrollIntoView({ ...elemScrollOptions, ...options });
  }, []);
}

export default useScroll;
