import axios from 'axios';

export const refreshTokens = async () => {
  return await axios({
    url: '/api/refresh',
    method: 'get',
  });
};
