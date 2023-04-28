import { useConversationQuery } from "hooks/queries";

import styles from "./styles/conversationOptionsList.module.scss";
import { DeleteIcon, ReadIcon } from "components/Layouts/Icons";

function ConversationOptionsList({
  setOpenConversationOption,
  conversationId,
  adressatId,
}) {
  const { deleteConversationQuery, markAsReadQuery } = useConversationQuery();

  return (
    <div className={styles.optBtnBox}>
      <button
        className={styles.optBtn}
        onClick={(e) => {
          e.stopPropagation();
          setOpenConversationOption(false);
          markAsReadQuery({ conversationId, adressatId });
        }}
      >
        <span className={styles.optIconBox}>
          <ReadIcon />
        </span>
        <span>mark as read</span>
      </button>
      <button
        className={`${styles.optBtn} ${styles.optDeleteBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpenConversationOption(false);
          deleteConversationQuery(conversationId);
        }}
      >
        <span className={styles.optIconBox}>
          <DeleteIcon />
        </span>
        <span>delete conversation</span>
      </button>
    </div>
  );
}

export default ConversationOptionsList;
