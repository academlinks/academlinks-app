import styles from './styles/showRepliesBTN.module.scss';

function ShowRepliesBTN({ handleShowReplies, data, conditions }) {
  const { showReplies, activeReply, updateReply } = conditions;
  const { adressatId, adressatName, replies, repliesAmount } = data;

  return (
    <button
      className={styles.showRepliesBtn}
      onClick={() => handleShowReplies({ adressatId, adressatName })}>
      {showReplies || activeReply || updateReply
        ? 'Hide Replies'
        : replies?.length > 0
        ? `Show Replies (${repliesAmount})`
        : ''}
    </button>
  );
}

export default ShowRepliesBTN;
