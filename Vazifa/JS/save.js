export function addLocal(key, value) {
  if (key) {
    localStorage.setItem("keys", JSON.stringify(value));
  }
}

export function removeLocal(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } catch (error) {
    return undefined;
  }
}
