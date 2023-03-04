export default function generateLinks(val) {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

  return val
    .replace(urlRegex, (match) => `<a>${match}<a>`)
    .split("<a>")
    .map((fr, i) => {
      if (urlRegex.test(fr))
        return (
          <a
            href={fr.startsWith("http") ? fr : `https://${fr}`}
            target="_blank"
            rel="noreferrer"
            key={`generated-link--${i}`}
          >
            {fr.replace(/[http:// | https://]/g, "")}
          </a>
        );
      else return <span key={`generated-span--${i}`}>{fr}</span>;
    });
}

// function detectURLs(message) {
//   var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
//   return message.match(urlRegex);
// }
