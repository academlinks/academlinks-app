/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useDocTitle(title) {
  useEffect(() => {
    document.title = `Academlinks ${title ? `| ${title}`:""}`;
  }, []);
}
