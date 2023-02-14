export default function generateLowerCaseData(data, excludeFields) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return;

  const temp = loopData(data, excludeFields);

  return temp;
}

function loopData(data, excludeFields) {
  const shallow = { ...data };
  const temp = {};

  for (const [key, value] of Object.entries(shallow)) {
    if (excludeFields && excludeFields.includes(key)) temp[key] = value;
    else temp[key] = checkValueTypeAndConvertToLower(value, excludeFields);
  }

  return temp;
}

function checkValueTypeAndConvertToLower(val, excludeFields) {
  if (typeof val === "string") return convertToLowerCase(val);
  else if (Array.isArray(val)) return convertArrayType(val, excludeFields);
  else if (typeof val === "object") return loopData(val, excludeFields);
  else return val;
}

function convertArrayType(data, excludeFields) {
  return [...data].map((piece) =>
    checkValueTypeAndConvertToLower(piece, excludeFields)
  );
}

function convertToLowerCase(val) {
  return val.toLowerCase();
}
