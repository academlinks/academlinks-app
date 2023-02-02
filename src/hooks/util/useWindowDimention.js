import { useEffect, useState } from 'react';

function getWindowDimention() {
  const { innerHeight, innerWidth } = window;
  return { width: innerWidth, height: innerHeight };
}

function useWindowDimention() {
  const [windowDimention, setWindowDimention] = useState(getWindowDimention());

  const handleResize = () => setWindowDimention(getWindowDimention());

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return { width: windowDimention.width, height: windowDimention.height };
}

export default useWindowDimention;
