import axios from 'axios';

export const refreshTokens = async () => {
  return await axios<{ result: boolean }>({
    url: '/api/refresh',
    method: 'get',
  });
};
