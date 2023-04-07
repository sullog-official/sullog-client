// import axios from '@/shared/configs/axios';
import axios from 'axios';

export const kakaoLoginCallback = async (code: string) => {
  axios
    .get(
      `http://ec2-3-18-111-157.us-east-2.compute.amazonaws.com:8081/kakao?code=${code}`
    )
    .then((res) => {
      console.log(res);
    });
};
