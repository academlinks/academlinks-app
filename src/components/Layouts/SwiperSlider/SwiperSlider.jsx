import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { extractRootEndPointFromImg } from "lib";

import { Image } from "components/Layouts";

SwiperCore.use([Navigation, Thumbs]);

function SwiperSlider({ mediaFiles = [], initialSlide }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        initialSlide={initialSlide}
        className={`swiperLocale ${
          mediaFiles.length < 2 ? "swiperLocaleFull" : ""
        }`}
      >
        {mediaFiles?.map((media) => (
          <SwiperSlide key={media}>
            <Image
              src={extractRootEndPointFromImg(media)}
              alt="post media"
              className="activeMedia"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {mediaFiles.length > 1 && (
        <Swiper
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={10}
          className="swiperThumbsLocale"
        >
          {mediaFiles?.map((media) => (
            <SwiperSlide key={`thumb-${media}`} className="thumbItem">
              <Image
                src={extractRootEndPointFromImg(media)}
                alt="post media"
                className="thumbMedia"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default SwiperSlider;
