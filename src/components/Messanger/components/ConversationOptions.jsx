import { DotsHorizontalIcon } from "components/Layouts/Icons";
import styles from "./styles/conversationOptions.module.scss";
import ConversationOptionsList from "./ConversationOptionsList";

function ConversationOptions({
  setOpenConversationOption,
  openConversationOption,
  conversationId,
  adressatId,
}) {
  return (
    <div className={styles.conversationOptions}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenConversationOption((prev) => !prev);
        }}
      >
        <DotsHorizontalIcon className={styles.dotBtn} />
      </button>
      {openConversationOption && (
        <ConversationOptionsList
          adressatId={adressatId}
          conversationId={conversationId}
          setOpenConversationOption={setOpenConversationOption}
        />
      )}
    </div>
  );
}

export default ConversationOptions;
