import axios from 'axios';

import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';
import {
  getRefreshToken,
  getTokensFromResponse,
  setAccessToken,
  setRefreshToken,
} from '@/shared/utils/auth';

/**
 * 리프레시 토큰을 사용하여 새 액세스 토큰을 가져옴
 * @returns 토근 리프레시 성공 여부
 */
export const refreshTokens = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();

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

    const tokens = getTokensFromResponse(response);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    return true;
  } catch (error) {
    return false;
  }
};
