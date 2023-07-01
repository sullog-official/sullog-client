import { ServerResponse } from 'http';

import { AxiosResponse } from 'axios';

import { getCookie, setCookie, setServerSideCookie } from './cookie';

enum TokenKeys {
  Access = 'authorization',
  Refresh = 'refresh',
}

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

export const removeAccessToken = () => {
  inMemoryAccessToken = undefined;
};

/**
 * 리프레시 토큰을 쿠키에 저장 (expires : 14일)
 */
export const setRefreshToken = (refreshToken: string) => {
  setCookie(TokenKeys.Refresh, refreshToken, 14);
};

export const setServerSideRefreshToken = (
  refreshToken: string,
  response: ServerResponse
) => {
  setServerSideCookie(response, TokenKeys.Refresh, refreshToken, 14);
};

export const getRefreshToken = () => {
  return getCookie(TokenKeys.Refresh);
};

export const removeRefreshToken = () => {
  document.cookie = 'refresh=; Max-Age=0; path=/';
};

export const getTokensFromResponse = (response: AxiosResponse) => {
  return {
    accessToken: response.headers['authorization'],
    refreshToken: response.headers['refresh'],
  };
};
