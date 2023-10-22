import { NextApiRequest, NextApiResponse } from 'next';

import { deleteAccessToken, deleteRefreshToken } from '@/shared/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  deleteAccessToken({ req, res });
  deleteRefreshToken({ req, res });
  res.redirect(307, '/login');
}
