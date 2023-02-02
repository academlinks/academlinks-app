import { useEffect, useCallback } from 'react';

function useRestrictBodyOverflow(isOpen, onMount = false) {
  const restrictScroll = useCallback((open) => {
    const body = document.querySelector('body');
    if (open) body.style.overflow = 'hidden';
    if (!open) {
      body.style.overflowY = 'scroll';
      body.style.overflowX = 'hidden';
    }
  }, []);

  useEffect(() => {
    if (onMount) restrictScroll(isOpen);
  }, [onMount, isOpen, restrictScroll]);

  return { restrictScroll };
}

export default useRestrictBodyOverflow;
