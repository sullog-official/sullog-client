import type { IncomingMessage, ServerResponse } from 'http';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import {
  NEXT_PUBLIC_KAKAO_BASE_URI,
  NEXT_PUBLIC_KAKAO_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  NEXT_PUBLIC_KAKAO_SCOPE,
} from '@/shared/constants';

import { REFRESH_TOKEN_KEY } from '../constants';

import { generateUrl } from './generateUrl';
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
