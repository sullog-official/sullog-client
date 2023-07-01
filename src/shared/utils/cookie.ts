import { ServerResponse } from 'http';

const getExpiresUTCString = (days: number) => {
  return new Date(
    new Date().getTime() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
};

const getCookieString = (name: string, value: string, expires?: number) => {
  return `${name}=${value || ''};${
    expires ? `expires=${getExpiresUTCString(expires)};` : ''
  } path=/`;
};

/**
 * Set a cookie with the given name, value, and expiration date
 * @param name
 * @param value
 * @param expires days
 */
export const setCookie = (name: string, value: string, expires?: number) => {
  document.cookie = getCookieString(name, value, expires);
};

export const setServerSideCookie = (
  response: ServerResponse,
  name: string,
  value: string,
  expires?: number
) => {
  response.setHeader('Set-Cookie', getCookieString(name, value, expires));
};

/**
 * Get the value of the cookie with the given name
 */
export const getCookie = (name: string) => {
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
