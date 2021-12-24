import Cookies from "js-cookie";
const tokenKey = "auth-token";

export function getToken() {
  if (typeof window !== "undefined") {
    // return localStorage.getItem(tokenKey);
    return Cookies.get(tokenKey);
  }
  return null;
}

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    // return localStorage.setItem(tokenKey, token);
    return Cookies.set(tokenKey, token);
  }
  return null;
}

export function removeToken() {
  if (typeof window !== "undefined") {
    // return localStorage.removeItem(tokenKey);
    return Cookies.remove(tokenKey);
  }
  return null;
}
