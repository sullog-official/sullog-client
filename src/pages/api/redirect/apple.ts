import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/constants';
import { setAccessToken, setRefreshToken } from '@/shared/utils/auth';
import { generateUrl } from '@/shared/utils/generateUrl';

const appleLoginCallback = (data: {
  code: string;
  name?: string;
  email?: string;
}) => {
  return axios({
    baseURL: NEXT_PUBLIC_API_BASE_URI,
    url: generateUrl({ url: '/apple' }),
    method: 'post',
    validateStatus: null,
    headers: { 'Content-Type': 'application/json' },
    data,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.body.code?.toString();
  const name = req.body.name?.toString();
  const email = req.body.email?.toString();
  console.log(code, name, email);

  if (!code) {
    console.log('1');

    res.redirect(307, '/login');
    return;
  }

  try {
    const response = await appleLoginCallback({ code, name, email });

    const {
      [ACCESS_TOKEN_KEY]: accessToken,
      [REFRESH_TOKEN_KEY]: refreshToken,
    } = response.headers;

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
