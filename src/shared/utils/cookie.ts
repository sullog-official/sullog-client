/**
 * Set a cookie with the given name, value, and expiration date
 * @param name
 * @param value
 * @param expireTime days * 24 * 60 * 60 * 1000
 */
function setCookie(name: string, value: string, expireTime?: number) {
  let expires = '';
  if (expireTime) {
    let date = new Date();
    date.setTime(date.getTime() + expireTime);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// Get the value of the cookie with the given name
const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const matchingCookie = cookies.find((cookie) => cookie.startsWith(nameEQ));

  if (matchingCookie) {
    return matchingCookie.slice(nameEQ.length);
  }

  return null;
};

export { setCookie, getCookie };
