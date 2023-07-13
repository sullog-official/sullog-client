import { NextApiRequest, NextApiResponse } from 'next';

import { deleteRefreshToken } from '@/shared/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  deleteRefreshToken({ req, res });
  res.redirect(307, '/login');
}
