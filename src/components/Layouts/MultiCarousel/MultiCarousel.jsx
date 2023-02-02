import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styles from "./multiCarousel.module.scss";
import { ArrowLeftRectingle, ArrowRightRectingle } from "../Icons/icons";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 480 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${styles.btn} ${styles.right}`}
    >
      <ArrowRightRectingle />
    </button>
  );
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${styles.btn} ${styles.left}`}
    >
      <ArrowLeftRectingle />
    </button>
  );
};

function MultiCarousel({
  children,
  responsiveness,
  swipeable = false,
  draggable = false,
  showDots = false,
  keyBoardControl = false,
  arrows = false,
  ssr = true,
  infinite = true,
  autoPlay = true,
  autoPlaySpeed = 20000,
  className,
  sliderClass,
}) {
  return (
    <Carousel
      sliderClass={sliderClass || ""}
      responsive={responsiveness || responsive}
      arrows={arrows}
      showDots={showDots}
      swipeable={swipeable}
      draggable={draggable}
      keyBoardControl={keyBoardControl}
      autoPlay={autoPlay}
      autoPlaySpeed={autoPlaySpeed}
      infinite={infinite}
      ssr={ssr}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      containerClass={className || ""}
      customTransition="all .5s"
    >
      {children}
    </Carousel>
  );
}

export default MultiCarousel;
