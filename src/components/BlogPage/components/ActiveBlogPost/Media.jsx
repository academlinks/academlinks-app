import styles from './styles/media.module.scss';
import { SwiperSlider } from '../../../Layouts';

function Media({ media }) {
  return (
    <div className={styles.media}>
      <SwiperSlider
        mediaFiles={media}
        initialSlide={0}
      />
    </div>
  );
}

export default Media;
