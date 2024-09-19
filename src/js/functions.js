export function checkSessionStorage() {
  const storedData = sessionStorage.getItem("apiResponse");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
}

export function setGames(data) {
  
}