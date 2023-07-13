import type { IncomingMessage, ServerResponse } from 'http';

import axios from 'axios';

import {
  ACCESS_TOKEN_KEY,
  NEXT_PUBLIC_API_BASE_URI,
  REFRESH_TOKEN_KEY,
} from '@/shared/constants';
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/shared/utils/auth';
import { isServer } from '@/shared/utils/isServer';

/**
 * 리프레시 토큰을 사용하여 새 액세스 토큰을 가져옴
 * @returns 토근 리프레시 성공 여부
 */
// TODO : api로 만들어서 서버에서 토큰 설정하도록 수정 (?)
export const refreshAccessToken = async (context?: {
  req?: IncomingMessage;
  res?: ServerResponse;
}): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken(context);

    if (!refreshToken) {
      throw new Error('refreshToken is undefined');
    }

    const response = await axios({
      baseURL: NEXT_PUBLIC_API_BASE_URI,
      url: '/token/refresh',
      method: 'get',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      validateStatus: null,
    });

    setAccessToken(response.headers[ACCESS_TOKEN_KEY]);
    setRefreshToken(response.headers[REFRESH_TOKEN_KEY], context);

    return true;
  } catch (error) {
    return false;
  }
};
