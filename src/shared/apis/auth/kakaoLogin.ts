import axios from '@/shared/configs/axios';

export const kakaoLoginCallback = async (code: string) =>
  await axios.get(`/kakao?code=${code}`);
