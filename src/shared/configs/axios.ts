import axios, { AxiosError, AxiosResponse } from 'axios';

import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';

import { getCookie, setCookie } from '../utils/cookie';

import registerLogger from './logger';

const env = process.env.NODE_ENV;

export enum TokenKeys {
  Access = 'authorization',
  Refresh = 'refresh',
}

// 새 액세스 토큰을 가져 오는 중인지 여부를 추적하는 변수
let isFetchingAccessToken = false;

// 새 액세스 토큰을 기다리는 구독자 배열
let subscribers: ((AccessToken: string) => Promise<void>)[] = [];

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

  // 새로운 액세스 토큰을 세션 스토리지에 저장
  sessionStorage.setItem(TokenKeys.Access, response.headers['authorization']);
  // 리프레시 토큰 쿠키를 새 값으로 업데이트
  setCookie(TokenKeys.Refresh, response.headers['refresh'], 14);

  // isFetchingAccessToken 플래그를 false로 설정
  isFetchingAccessToken = false;

  // 새 액세스 토큰을 기다리는 모든 구독자를 호출하고 새 토큰 값을 전달
  subscribers.forEach((callback) =>
    callback(response.headers['authorization'])
  );

  // 구독자 배열 지우기
  subscribers = [];
}

/**
 * axios instance wrapper
 * @example await instance.get<{foo:string}>('/bar')
 */
const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URI,
});

// 각 요청마다 세션 스토리지에 있는 액세스 토큰 값을 Authorization 헤더에 설정하기 위한 인터셉터 추가
instance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem(TokenKeys.Access);

  if (accessToken && accessToken !== 'undefined') {
    config.headers['authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

// 401 에러 처리하는 interceptor 추가
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        if (subscribers.length > 3) {
          throw new Error('exceed retry limit count');
        }

        // 새 액세스 토큰을 얻은 후 원래 요청을 다시 시도하기 위한 새 promise 만들기
        const retryOriginalRequest = new Promise<AxiosResponse<any, any>>(
          (resolve, reject) => {
            // 새 액세스 토큰을 기다리면서 원래 요청을 다시 시도하기 위해 subscriber 추가
            subscribers.push(async (AccessToken: string) => {
              try {
                if (error.config) {
                  error.config.headers['authorization'] = AccessToken;
                  resolve(instance(error.config));
                }
              } catch (err) {
                reject(err);
              }
            });
          }
        );

        const refreshToken = getCookie(TokenKeys.Refresh);

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

    return Promise.reject(error);
  }
);

registerLogger(instance);

export default instance;
