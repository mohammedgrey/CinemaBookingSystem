export const toQueryObj = (string = window.location.href) => {
  const parts = string.substr(1).split("&");
  const obj: any = {};
  for (let part of parts) {
    const pair = part.split("=");
    obj[pair[0]] = decodeURIComponent(pair[1]);
  }
  return obj;
};
