import axios from 'axios';

export const logout = async () => {
  return await axios({
    url: '/api/logout',
    method: 'get',
  });
};
