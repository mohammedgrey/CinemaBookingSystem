export const tokenKey = 'auth-token';

export function getToken() {
  if (typeof window !== 'undefined') {
    const returnedItem = localStorage.getItem(tokenKey);
    if (returnedItem) return JSON.parse(returnedItem);
  }
  return null;
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(tokenKey, JSON.stringify(token));
  }
  return null;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(tokenKey);
  }
  return null;
}
