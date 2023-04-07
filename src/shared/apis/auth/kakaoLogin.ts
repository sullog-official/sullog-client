import axios from '@/shared/configs/axios';

export const kakaoLoginCallback = async (code: string) => {
  axios.get(`/kakao?code=${code}`).then((res) => {
    console.log(res?.headers);
  });
};
