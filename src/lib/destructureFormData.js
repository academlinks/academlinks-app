export default function destructureFormData(target) {
  const formData = new FormData(target);

  const output = {};

  for (const [key, value] of formData) {
    output[key] = value;
  }

  return output;
}
