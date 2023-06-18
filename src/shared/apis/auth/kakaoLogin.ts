import axios from 'axios';

import { NEXT_PUBLIC_API_BASE_URI } from '@/shared/constants';
import { generateUrl } from '@/shared/utils/generateUrl';

export const kakaoLoginCallback = (code: string) =>
  axios.request({
    baseURL: NEXT_PUBLIC_API_BASE_URI,
    url: generateUrl({ url: '/kakao', params: { code } }),
    method: 'get',
    validateStatus: null,
  });
