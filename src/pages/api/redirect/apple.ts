import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { login } from '@/shared/apis/auth/login';
import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';
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
    res.redirect(307, '/login');
    return;
  }

  try {
    await login(await appleLoginCallback({ code, name, email }));
  } catch (err) {
    console.error(err);
    res.redirect(307, '/login');
  }
}
