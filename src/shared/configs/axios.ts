import axios, { AxiosError, AxiosResponse } from 'axios';

import { refreshAccessToken } from '@/shared/apis/auth/refreshAccessToken';
import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';

import { getAccessToken } from '../utils/auth';
import { isServer } from '../utils/isServer';

import registerLogger from './logger';

// 새 액세스 토큰을 가져 오는 중인지 여부를 추적하는 변수
let isFetchingAccessToken = false;

// 새 액세스 토큰을 기다리는 구독자 배열
let subscribers: ((accessToken: string) => Promise<void>)[] = [];

const handleUnauthorizedError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    try {
      throw new Error('exceed retry limit count');
    } catch (error) {
      // 새 액세스 토큰을 가져 오는 동안 오류가 발생하면 로그인 페이지로 리디렉션
      if (!isServer()) {
        window.location.href = '/login'; // TBD
      }
    }
  }
};

/**
 * axios instance wrapper
 * @example await instance.get<{foo:string}>('/bar')
 */
const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URI,
  timeout: 3000,
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
