import axios from '@/shared/configs/axios';

export const kakaoLogin = async () => {
  const data = await axios.get('/oauth2/authorization/kakao');
  console.log(data);
};
