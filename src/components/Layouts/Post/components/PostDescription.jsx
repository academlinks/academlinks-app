import { useState, useEffect } from "react";

import { useWindowDimention } from "../../../../hooks";

import styles from "./styles/postDescription.module.scss";
import { ShowMoreInlineBTN, ParagraphsGenerator } from "../../";

function PostDescription({ description, className }) {
  const [showMore, setShowMore] = useState(false);

  const [limit, setLimit] = useState(980);
  const { width } = useWindowDimention();
  useEffect(() => {
    if (width <= 680) setLimit(450);
    else if (width <= 960) setLimit(600);
    else setLimit(980);
  }, [width]);

  const text =
    description?.length > limit && !showMore ? (
      <>
        <ParagraphsGenerator
          text={description?.slice(0, limit).concat("...")}
        />
        <ShowMoreInlineBTN handler={() => setShowMore(true)} />
      </>
    ) : (
      <ParagraphsGenerator text={description} />
    );

  return (
    <div className={`${styles.postDescription} ${className || ""}`}>{text}</div>
  );
}

export default PostDescription;
