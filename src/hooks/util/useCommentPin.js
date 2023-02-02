function useCommentPin(comments) {
  if (!comments) return;

  let sortedData = [...comments];

  sortedData = sortedData
    ?.sort((curr) => (curr.pin ? -1 : 1))
    ?.sort((curr, next) =>
      curr.pin && new Date(curr.createdAt) > new Date(next.createdAt) ? -1 : 1
    );

  return sortedData;
}

export default useCommentPin;
