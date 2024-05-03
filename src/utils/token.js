var token;
export function setToken(tokenString) {
  token = tokenString;
  localStorage.setItem("token", JSON.stringify(token));
}
export function getToken() {
  if (!token) {
    token = JSON.parse(localStorage.getItem("token"));
  }
  return token;
}

export function removeToken() {
  token = "";
  localStorage.removeItem("token");
}
