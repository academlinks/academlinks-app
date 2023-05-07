/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  resetSharePostModal,
  setShareAudience,
} from "store/reducers/portalReducer";
import { usePostQuery } from "hooks/queries";
import { useRestrictBodyOverflow } from "hooks/util";
import { selectSharePostPortal } from "store/selectors/portalSelectors";
import { selectActiveUserShortInfo } from "store/selectors/activeUserSelectors";

import {
  Modal,
  PostAuthentic,
  UserIdentifier,
  DraftEditor,
  SelectAudience,
  BTN,
  InlineStandSpinner,
  Error,
} from "components/Layouts";
import styles from "./styles/sharePostPortal.module.scss";

function SharePostPortal() {
  const dispatch = useDispatch();

  const {
    sharePostModalIsOpen,
    sharePostData,
    shareAudience,
    sharePostLoadingState: { loading, error, message },
  } = useSelector(selectSharePostPortal);
  const { userName, image } = useSelector(selectActiveUserShortInfo);

  const [text, setText] = useState("");

  const deactivateHandler = () => dispatch(resetSharePostModal());

  const handleAudience = (audience) => dispatch(setShareAudience(audience));

  const { sharePostQuery } = usePostQuery();

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    return () => restrictScroll(false);
  }, []);

  return (
    <Modal
      isOpen={sharePostModalIsOpen}
      setIsOpen={deactivateHandler}
      extraStyles={{ background: "white" }}
      modalClassName={styles.shareModal}
    >
      {loading && <InlineStandSpinner />}

      <div className={styles.modalContent}>
        <div className={styles.portalHeader}>
          <UserIdentifier img={image} userName={userName} withTime={false}>
            <div data-portal-audience>
              <SelectAudience
                audience={shareAudience}
                handleAudience={handleAudience}
              />
            </div>
          </UserIdentifier>
        </div>

        {error && <Error msg={message} />}

        <div className={styles.portalEditor}>
          <DraftEditor
            setText={setText}
            placeholder="description"
            className={styles.descriptionField}
          />
        </div>

        <div className={styles.portalContent}>
          <PostAuthentic
            shared={true}
            type={sharePostData.type}
            authenticType={sharePostData.authenticType}
            data={sharePostData}
            proccessShare={true}
          />
        </div>

        <div className={styles.portalFooter}>
          <BTN
            onClick={() =>
              sharePostQuery(sharePostData._id, {
                audience: shareAudience,
                description: text ? JSON.stringify(text) : "",
              })
            }
          >
            post
          </BTN>
        </div>
      </div>
    </Modal>
  );
}

export default SharePostPortal;
