import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  NEXT_PUBLIC_API_BASE_URI,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/shared/constants';
import { setAccessToken, setRefreshToken } from '@/shared/utils/auth';
import { generateUrl } from '@/shared/utils/generateUrl';

const kakaoLoginCallback = (code: string) => {
  return axios({
    baseURL: NEXT_PUBLIC_API_BASE_URI,
    url: generateUrl({ url: '/kakao', params: { code } }),
    method: 'get',
    validateStatus: null,
  });
};

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

    const {
      [ACCESS_TOKEN_KEY]: accessToken,
      [REFRESH_TOKEN_KEY]: refreshToken,
    } = response.headers;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken, { req, res });

    res.redirect(307, '/');
  } catch (err) {
    console.error(err);
    res.redirect(307, '/login');
  }
}
