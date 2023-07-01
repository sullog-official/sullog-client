import { NextApiRequest, NextApiResponse } from 'next';

import { kakaoLoginCallback } from '@/shared/apis/auth/kakaoLogin';
import {
  getTokensFromResponse,
  setAccessToken,
  setServerSideRefreshToken,
} from '@/shared/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code?.toString();

  if (!code) {
    res.redirect(307, '/login');
    return;
  }

  try {
    const response = await kakaoLoginCallback(code);
    const tokens = getTokensFromResponse(response);

    setAccessToken(tokens.accessToken);
    setServerSideRefreshToken(tokens.refreshToken, res);

    res.redirect(307, '/');
  } catch (err) {
    console.error(err);
    res.redirect(307, '/login');
  }
}
