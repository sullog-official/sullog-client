import { NextApiRequest, NextApiResponse } from 'next';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/constants';
import { setAccessToken, setRefreshToken } from '@/shared/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const headers = res.getHeaders();

    const accessToken = headers[ACCESS_TOKEN_KEY]?.toString();
    const refreshToken = headers[REFRESH_TOKEN_KEY]?.toString();

    if (!refreshToken) {
      throw new Error("'refreshToken' is undefined");
    }

    if (!accessToken) {
      throw new Error("'accessToken' is undefined");
    }

    setAccessToken(accessToken);
    setRefreshToken(refreshToken, { req, res });

    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    console.log('res.getHeaders', res.getHeaders());

    res.redirect(307, '/');
  } catch (err) {
    console.error(err);
    res.redirect(307, '/login');
  }
}
