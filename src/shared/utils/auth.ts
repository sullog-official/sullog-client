import type { IncomingMessage, ServerResponse } from 'http';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { REFRESH_TOKEN_KEY } from '../constants';

import { isServer } from './isServer';

let inMemoryAccessToken: string | undefined;

/**
 * 액세스 토큰을 인메모리에 저장
 */
export const setAccessToken = (accessToken: string) => {
  inMemoryAccessToken = accessToken;
};

export const getAccessToken = (): string | undefined => {
  return inMemoryAccessToken;
};

export const deleteAccessToken = () => {
  inMemoryAccessToken = '';
};

/**
 * 리프레시 토큰을 쿠키에 저장 (expires : 14일)
 */
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

export const setRefreshToken = (
  refreshToken: string,
  /** required for server side cookies */
  context?: { req?: IncomingMessage; res?: ServerResponse }
) => {
  if (isServer() && !context) {
    throw new Error("'context' is required for server side cookies");
  }

  if (!refreshToken) {
    throw new Error("'refreshToken' is undefined");
  }

  setCookie(REFRESH_TOKEN_KEY, refreshToken, {
    ...(context || {}),
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: FOURTEEN_DAYS,
    sameSite: 'strict',
    path: '/',
  });
};

export const getRefreshToken = async (context?: {
  req?: IncomingMessage;
  res?: ServerResponse;
}) => {
  if (isServer() && !context) {
    throw new Error("'context' is required for server side cookies");
  }

  return (await getCookie(REFRESH_TOKEN_KEY, context)) as string | undefined;
};

export const deleteRefreshToken = (context?: {
  req?: IncomingMessage;
  res?: ServerResponse;
}) => {
  if (isServer() && !context) {
    throw new Error("'context' is required for server side cookies");
  }

  deleteCookie(REFRESH_TOKEN_KEY, context);
};
