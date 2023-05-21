import axios from '@/shared/configs/axios';

export const kakaoLoginCallback = (code: string) =>
  axios.request({
    url: `/kakao?code=${code}`,
    method: 'get',
    validateStatus: null,
  });
