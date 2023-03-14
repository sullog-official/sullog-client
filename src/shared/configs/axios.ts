import axios, { AxiosResponse } from 'axios';

import { getCookie, setCookie } from '../utils/cookie';

import registerLogger from './logger';

const env = process.env.NODE_ENV;

enum TokenKeys {
  Access = 'ACCESSTOKEN',
  Refresh = 'REFRESHTOKEN',
}

let isFetchingAccessToken = false;
let subscribers: ((AccessToken: string) => Promise<void>)[] = [];

function getAccessToken() {
  return sessionStorage.getItem(TokenKeys.Access);
}

async function refreshAccessToken() {
  isFetchingAccessToken = true;

  const response = await instance.get('/token/refresh', {
    validateStatus: null,
    headers: {
      Authorization: getCookie(TokenKeys.Refresh),
    },
  });

  sessionStorage.setItem(TokenKeys.Access, response.headers['Authorization']);
  setCookie(TokenKeys.Refresh, response.headers['Refresh'], 14);

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
      : 'https://api.bbpsp-backend-api.click', // TBD
});

instance.interceptors.request.use((config) => {
  const AccessToken = getAccessToken();

  if (AccessToken) {
    config.headers['Authorization'] = 'Bearer ' + AccessToken;
  }

  return config;
});

instance.interceptors.response.use(async (error) => {
  if (error.status === 401) {
    try {
      const retryOriginalRequest = new Promise<AxiosResponse<any, any>>(
        (resolve, reject) => {
          subscribers.push(async (AccessToken: string) => {
            try {
              error.config.headers['Authorization'] = 'Bearer ' + AccessToken;
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
    }
  }
  return Promise.reject(error);
});

registerLogger(instance);

export default instance;
