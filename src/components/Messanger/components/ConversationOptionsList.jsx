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
        data-options-modal-button
        onClick={(e) => {
          e.stopPropagation();
          setOpenConversationOption(false);
          markAsReadQuery({ conversationId, adressatId });
        }}
      >
        <ReadIcon />

        <span>mark as read</span>
      </button>
      <button
        data-options-modal-button
        data-options-modal-delete-button
        onClick={(e) => {
          e.stopPropagation();
          setOpenConversationOption(false);
          deleteConversationQuery(conversationId);
        }}
      >
        <DeleteIcon />
        <span>delete conversation</span>
      </button>
    </div>
  );
}

export default ConversationOptionsList;
