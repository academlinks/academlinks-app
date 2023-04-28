import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { extractRootEndPointFromImg } from "lib";
import { selectSliderBlogPosts } from "store/selectors/postSelectors";

import styles from "./styles/stand.module.scss";
import { MultiCarousel } from "components/Layouts";

function Stand() {
  const sliderBlogPosts = useSelector(selectSliderBlogPosts);

  return (
    <div className={styles.stand}>
      <>
        {sliderBlogPosts[0] && (
          <MultiCarousel
            className={styles.slider}
            sliderClass={styles.standCarousel}
          >
            {sliderBlogPosts.map((slide) => (
              <Link
                to={`/blog/${slide._id}`}
                className={styles.slide}
                key={slide._id}
                target="_blank"
              >
                <figure className={styles.standFig}>
                  <img
                    src={extractRootEndPointFromImg(slide.media)}
                    alt={slide.title}
                  />
                </figure>
                <div className={styles.standTitle}>
                  <blockquote>{slide.title}</blockquote>
                </div>
              </Link>
            ))}
          </MultiCarousel>
        )}
        {!sliderBlogPosts[0] && (
          <figure className={styles.standFig}>
            <img src="/img/slider-stand.webp" alt="academlinks" />
          </figure>
        )}
      </>
    </div>
  );
}

export default Stand;
