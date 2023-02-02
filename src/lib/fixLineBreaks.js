export default function fixLineBreaks(str) {
  if (!str || typeof str !== 'string') return;

  const reg = /\r|\n/g;
  const match = reg.exec(str);
  if (match) return str.replaceAll(reg, '</br>');
  else return str;
}
