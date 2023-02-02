const configs = {
  shortNumeric: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
  verbal: {
    month: "short",
    year: "numeric",
    day: "numeric",
  },
  long: {},
};

export default function formatDate(dateToFormat, config = "shortNumeric") {
  if (!dateToFormat) return null;

  const date = new Date(dateToFormat);

  const formattedDate = new Intl.DateTimeFormat(
    "en-us",
    configs[config]
  )?.format(date);

  return formattedDate.split("/").join("-");
}
