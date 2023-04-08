import axios from '@/shared/configs/axios';

export const kakaoLoginCallback = (code: string) =>
  axios.get(`/kakao?code=${code}`);
