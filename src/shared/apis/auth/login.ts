import axios, { AxiosResponse } from 'axios';

export const login = async (res: AxiosResponse<any, any>) => {
  return await axios({
    url: '/api/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json', ...res.headers },
  });
};
