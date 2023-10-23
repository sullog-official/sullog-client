import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const refreshToken = getRefreshToken({ req, res });

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

    const newAccessToken = response.headers[ACCESS_TOKEN_KEY];
    const newRefreshToken = response.headers[REFRESH_TOKEN_KEY];

    if (!newAccessToken || !newRefreshToken) {
      throw new Error('Invalid tokens.');
    }

    setAccessToken(newAccessToken, { req, res });
    setRefreshToken(newRefreshToken, { req, res });

    res.status(200).json({ result: true });
  } catch (err) {
    res.status(200).json({ result: false });
  }
}
