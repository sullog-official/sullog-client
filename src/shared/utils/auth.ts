import type { IncomingMessage, ServerResponse } from 'http';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import {
  NEXT_PUBLIC_KAKAO_BASE_URI,
  NEXT_PUBLIC_KAKAO_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  NEXT_PUBLIC_KAKAO_SCOPE,
} from '@/shared/constants';

import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from '../constants';

import { generateUrl } from './generateUrl';
import { InMemoryValue } from './inMemory';
import { isServer } from './isServer';

const ONE_DAY = 24 * 60 * 60 * 1000;

const inMemoryAccessToken = new InMemoryValue<string | undefined>(undefined);

export const setAccessToken = (
  accessToken: string,
  context?: { req?: IncomingMessage; res?: ServerResponse }
) => {
  if (isServer() && context) {
    setCookie(ACCESS_TOKEN_KEY, accessToken, {
      ...(context || {}),
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: ONE_DAY,
      sameSite: 'strict',
      path: '/',
    });
  }
  inMemoryAccessToken.set(accessToken);
};

export const getAccessToken = (context?: {
  req?: IncomingMessage;
  res?: ServerResponse;
}): string | undefined => {
  if (isServer() && context) {
    return getCookie(ACCESS_TOKEN_KEY, context) as string | undefined;
  }
  return inMemoryAccessToken.get();
};

export const deleteAccessToken = (context?: {
  req?: IncomingMessage;
  res?: ServerResponse;
}) => {
  if (isServer() && context) {
    deleteCookie(ACCESS_TOKEN_KEY, context);
  }
  inMemoryAccessToken.delete();
};

const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

export const setRefreshToken = (
  refreshToken: string,
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

export const getRefreshToken = (context?: {
  req?: IncomingMessage;
  res?: ServerResponse;
}) => {
  if (isServer() && !context) {
    throw new Error("'context' is required for server side cookies");
  }

  return getCookie(REFRESH_TOKEN_KEY, context) as string | undefined;
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

export const getKakaoOAuthAuthorizeUrl = () => {
  return generateUrl({
    url: NEXT_PUBLIC_KAKAO_BASE_URI!,
    params: {
      response_type: 'code',
      client_id: NEXT_PUBLIC_KAKAO_CLIENT_ID,
      scope: NEXT_PUBLIC_KAKAO_SCOPE,
      redirect_uri: NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    },
  });
};

// TODO: 환경변수로 관리
export const getAppleOAuthAuthorizeUrl = () => {
  return generateUrl({
    url: 'https://appleid.apple.com/auth/authorize',
    params: {
      client_id: 'sullogapp.sullog.com',
      redirect_uri: 'https://sullog-client.vercel.app/api/redirect/apple',
      response_type: 'code',
      scope: 'name email',
      response_mode: 'form_post',
    },
  });
};
