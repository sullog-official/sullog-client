import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/constants';
import { setAccessToken, setRefreshToken } from '@/shared/utils/auth';
import { generateUrl } from '@/shared/utils/generateUrl';

const appleLoginCallback = (code: string, name?: string, email?: string) => {
  return axios({
    baseURL: NEXT_PUBLIC_API_BASE_URI,
    url: generateUrl({ url: '/apple', params: { code, name, email } }),
    method: 'post',
    validateStatus: null,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('req', req.body);
  const code = req.query.code?.toString();
  const name = req.query.name?.toString();
  const email = req.query.email?.toString();

  if (!code) {
    res.redirect(307, '/login');
    return;
  }

  try {
    let response;
    if (name && email) response = await appleLoginCallback(code, name, email);
    else response = await appleLoginCallback(code);
    console.log(response);

    const {
      [ACCESS_TOKEN_KEY]: accessToken,
      [REFRESH_TOKEN_KEY]: refreshToken,
    } = response.headers;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken, { req, res });

    if (refreshToken) {
      res.setHeader(
        'Set-Cookie',
        `${REFRESH_TOKEN_KEY}=${refreshToken}; path=/; samesite=lax; httponly;`
      );
    }

    res.redirect(307, '/');
  } catch (err) {
    console.error(err);
    res.redirect(307, '/login');
  }
}
