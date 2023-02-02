export default function inverseLineBreaks(str) {
  const reg = /<\/br>/g;
  const match = reg.exec(str);
  if (match) return str.replaceAll(reg, "\r\n");
  else return str;
}
