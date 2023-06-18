const getExpiresUTCString = (days: number) => {
  return new Date(
    new Date().getTime() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
};

/**
 * Set a cookie with the given name, value, and expiration date
 * @param name
 * @param value
 * @param expires days
 */
function setCookie(name: string, value: string, expires?: number) {
  document.cookie = `${name}=${value || ''};${
    expires ? `expires=${getExpiresUTCString(expires)};` : ''
  } path=/`;
}

/**
 * Get the value of the cookie with the given name
 */
const getCookie = (name: string) => {
  const cookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  return cookies[name] ?? null;
};

export { setCookie, getCookie };
