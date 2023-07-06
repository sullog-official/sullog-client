import axios, { AxiosError, AxiosResponse } from 'axios';

import { refreshTokens } from '@/shared/apis/auth/refreshTokens';
import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';

import { getAccessToken, getRefreshToken } from '../utils/auth';

import registerLogger from './logger';

// 새 액세스 토큰을 가져 오는 중인지 여부를 추적하는 변수
let isFetchingAccessToken = false;

// 새 액세스 토큰을 기다리는 구독자 배열
let subscribers: ((accessToken: string) => Promise<void>)[] = [];

const handleUnauthorizedError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    try {
      if (subscribers.length > 3) {
        throw new Error('exceed retry limit count');
      }

      // 새 액세스 토큰을 얻은 후 원래 요청을 다시 시도하기 위한 새 promise 만들기
      const retryOriginalRequest = new Promise<AxiosResponse>(
        (resolve, reject) => {
          // 새 액세스 토큰을 기다리면서 원래 요청을 다시 시도하기 위해 subscriber 추가
          subscribers.push(async (accessToken: string) => {
            try {
              if (error.config) {
                error.config.headers['authorization'] = `Bearer ${accessToken}`;
                resolve(instance(error.config));
              }
            } catch (err) {
              reject(err);
            }
          });
        }
      );

      if (!isFetchingAccessToken) {
        isFetchingAccessToken = true;
        await refreshTokens();
        isFetchingAccessToken = false;

        const accessToken = getAccessToken()!;
        // 새 액세스 토큰을 기다리는 모든 구독자를 호출하고 새 토큰 값을 전달
        subscribers.forEach((callback) => callback(accessToken));

        // 구독자 배열 지우기
        subscribers = [];
      }

      // 새 액세스 토큰을 가져 온 후 원래 요청을 다시 시도하기 위한 프로미스 반환
      return await retryOriginalRequest;
    } catch (error) {
      // 새 액세스 토큰을 가져 오는 동안 오류가 발생하면 로그인 페이지로 리디렉션
      if (typeof window !== 'undefined') window.location.href = '/login';
    }
  }
};

/**
 * axios instance wrapper
 * @example await instance.get<{foo:string}>('/bar')
 */
const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URI,
});

// 각 요청마다 세션 스토리지에 있는 액세스 토큰 값을 Authorization 헤더에 설정하기 위한 인터셉터 추가
instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 401 에러 처리하는 interceptor 추가
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    handleUnauthorizedError(error);
    return Promise.reject(error);
  }
);

registerLogger(instance);

export default instance;
