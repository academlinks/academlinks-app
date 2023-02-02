import { useSelector, useDispatch } from "react-redux";

import {
  selectMediaModalIsOpen,
  selectActiveMediaIndex,
  selectMediaFiles,
} from "../../store/selectors/portalSelectors";
import { deactivateMediaModal } from "../../store/reducers/portalReducer";

import styles from "./styles/mediaPortal.module.scss";
import { Modal, SwiperSlider } from "../Layouts";

function MediaPortal() {
  const dispatch = useDispatch();

  const mediaModalIsOpen = useSelector(selectMediaModalIsOpen);
  const activeMediaIndex = useSelector(selectActiveMediaIndex);
  const mediaFiles = useSelector(selectMediaFiles);

  const deactivateHandler = () => dispatch(deactivateMediaModal());

  return (
    <Modal
      isOpen={mediaModalIsOpen}
      setIsOpen={deactivateHandler}
      className={styles.postModal}
    >
      {activeMediaIndex >= 0 && (
        <SwiperSlider mediaFiles={mediaFiles} initialSlide={activeMediaIndex} />
      )}
    </Modal>
  );
}

export default MediaPortal;
