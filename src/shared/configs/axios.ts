import axios, { AxiosError, AxiosResponse } from 'axios';

import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';

import {
  getAccessToken,
  getRefreshToken,
  getTokensFromResponse,
  setAccessToken,
  setRefreshToken,
} from '../utils/auth';

import registerLogger from './logger';

// 새 액세스 토큰을 가져 오는 중인지 여부를 추적하는 변수
let isFetchingAccessToken = false;

// 새 액세스 토큰을 기다리는 구독자 배열
let subscribers: ((accessToken: string) => Promise<void>)[] = [];

// 리프레시 토큰을 사용하여 새 액세스 토큰을 가져 오는 함수
async function refreshAccessToken(refreshToken: string) {
  // 중복된 새로 고침 요청을 방지하기 위해 isFetchingAccessToken 플래그를 true로 설정
  isFetchingAccessToken = true;

  // 새로운 액세스 토큰을 가져 오기 위해 서버에 요청 보내기
  const response = await instance.get('/token/refresh', {
    validateStatus: null,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const tokens = getTokensFromResponse(response);

  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);

  // isFetchingAccessToken 플래그를 false로 설정
  isFetchingAccessToken = false;

  // 새 액세스 토큰을 기다리는 모든 구독자를 호출하고 새 토큰 값을 전달
  subscribers.forEach((callback) => callback(tokens.accessToken));

  // 구독자 배열 지우기
  subscribers = [];
}

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

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        throw new Error('refreshToken is undefined');
      }

      // 새 액세스 토큰을 이미 가져 오는 중이 아니면 새 액세스 토큰 가져 오기
      if (!isFetchingAccessToken) {
        refreshAccessToken(refreshToken);
      }

      // 새 액세스 토큰을 가져 온 후 원래 요청을 다시 시도하기 위한 프로미스 반환
      return await retryOriginalRequest;
    } catch (error) {
      // 새 액세스 토큰을 가져 오는 동안 오류가 발생하면 로그인 페이지로 리디렉션
      window.location.href = '/login'; // TBD
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
