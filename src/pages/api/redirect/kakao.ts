import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/constants';
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
    setAccessToken(response.headers[ACCESS_TOKEN_KEY]);
    setRefreshToken(response.headers[REFRESH_TOKEN_KEY], { req, res });

    res.redirect(307, '/');
  } catch (err) {
    console.error(err);
    res.redirect(307, '/login');
  }
}
