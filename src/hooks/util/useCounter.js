function useCounter(data, nestedField) {
  return data
    ?.map((acc) => {
      const nestedLength = acc?.[nestedField]?.length || 0;
      return nestedLength + 1;
    })
    .reduce((acc, num) => num + acc, 0);
}

export default useCounter;
