import axios, { AxiosResponse } from 'axios';

import { getCookie, setCookie } from '../utils/cookie';

import registerLogger from './logger';

const env = process.env.NODE_ENV;

enum TOKEN_KEYS {
  ACCESS = 'ACCESSTOKEN',
  REFRESH = 'REFRESHTOKEN',
}

let isFetchingAccessToken = false;
let subscribers: ((accessToken: string) => Promise<void>)[] = [];

function getAccessToken() {
  return sessionStorage.getItem(TOKEN_KEYS.ACCESS);
}

async function refreshAccessToken() {
  isFetchingAccessToken = true;

  const response = await instance.get('/token/refresh', {
    validateStatus: null,
    headers: {
      Authorization: getCookie(TOKEN_KEYS.REFRESH),
    },
  });

  sessionStorage.setItem(TOKEN_KEYS.ACCESS, response.headers['Authorization']);
  setCookie(TOKEN_KEYS.REFRESH, response.headers['Refresh'], 14);

  isFetchingAccessToken = false;

  subscribers.forEach((callback) =>
    callback(response.headers['Authorization'])
  );
  subscribers = [];
}

/**
 * axios instance wrapper
 * @example await instance.get<{foo:string}>('/bar')
 */
const instance = axios.create({
  baseURL:
    env === 'development'
      ? 'https://api.bbpsp-backend-api.click'
      : /** TODO: chagne production server url */
        'https://api.bbpsp-backend-api.click',
});

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  return config;
});

instance.interceptors.response.use(async (error) => {
  if (error.status === 401) {
    try {
      const retryOriginalRequest = new Promise<AxiosResponse<any, any>>(
        (resolve, reject) => {
          subscribers.push(async (accessToken: string) => {
            try {
              error.config.headers['Authorization'] = 'Bearer ' + accessToken;
              resolve(instance(error.config));
            } catch (err) {
              reject(err);
            }
          });
        }
      );

      if (!isFetchingAccessToken) {
        refreshAccessToken();
      }

      return await retryOriginalRequest;
    } catch (error) {
      window.location.href = '/signin'; // TBD
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

registerLogger(instance);

export default instance;
