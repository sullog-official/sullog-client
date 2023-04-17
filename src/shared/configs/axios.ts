import axios, { AxiosResponse } from 'axios';

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

// 세션 스토리지에서 액세스 토큰을 가져 오는 함수
function getAccessToken() {
  return sessionStorage.getItem(TokenKeys.Access);
}

// 리프레시 토큰을 사용하여 새 액세스 토큰을 가져 오는 함수
async function refreshAccessToken() {
  console.log('refreshAccessToken');
  // 중복된 새로 고침 요청을 방지하기 위해 isFetchingAccessToken 플래그를 true로 설정
  isFetchingAccessToken = true;

  // 새로운 액세스 토큰을 가져 오기 위해 서버에 요청 보내기
  const response = await instance.get('/token/refresh', {
    validateStatus: null,
    // Authorization 헤더를 리프레시 토큰 쿠키 값으로 설정
    headers: {
      Authorization: getCookie(TokenKeys.Refresh),
    },
  });

  // 새로운 액세스 토큰을 세션 스토리지에 저장
  sessionStorage.setItem(TokenKeys.Access, response.headers['authorization']);
  // 리프레시 토큰 쿠키를 새 값으로 업데이트
  setCookie(
    TokenKeys.Refresh,
    response.headers['refresh'],
    24 * 60 * 60 * 1000 * 14
  );

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
  baseURL:
    env === 'development'
      ? 'http://ec2-13-124-179-45.ap-northeast-2.compute.amazonaws.com:8081/docs/api-doc.html'
      : 'http://ec2-13-124-179-45.ap-northeast-2.compute.amazonaws.com:8081/docs/api-doc.html', // TBD
});

// 각 요청마다 세션 스토리지에 있는 액세스 토큰 값을 Authorization 헤더에 설정하기 위한 인터셉터 추가
instance.interceptors.request.use((config) => {
  const AccessToken = getAccessToken();

  if (AccessToken) {
    config.headers['authorization'] = AccessToken;
  }

  return config;
});

// 401 에러 처리하는 interceptor 추가
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.status === 401) {
      try {
        // 새 액세스 토큰을 얻은 후 원래 요청을 다시 시도하기 위한 새 promise 만들기
        const retryOriginalRequest = new Promise<AxiosResponse<any, any>>(
          (resolve, reject) => {
            // 새 액세스 토큰을 기다리면서 원래 요청을 다시 시도하기 위해 subscriber 추가
            subscribers.push(async (AccessToken: string) => {
              try {
                error.config.headers['authorization'] = AccessToken;
                resolve(instance(error.config));
              } catch (err) {
                reject(err);
              }
            });
          }
        );

        // 새 액세스 토큰을 이미 가져 오는 중이 아니면 새 액세스 토큰 가져 오기
        if (!isFetchingAccessToken) {
          refreshAccessToken();
        }

        // 새 액세스 토큰을 가져 온 후 원래 요청을 다시 시도하기 위한 프로미스 반환
        return await retryOriginalRequest;
      } catch (error) {
        // 새 액세스 토큰을 가져 오는 동안 오류가 발생하면 로그인 페이지로 리디렉션
        window.location.href = '/signin'; // TBD
      }
    }

    return Promise.reject(error);
  }
);

registerLogger(instance);

export default instance;
