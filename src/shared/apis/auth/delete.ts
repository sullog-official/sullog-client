import axios from 'axios';

export const deleteUser = async () => {
  return await axios({
    url: '/members/me',
    method: 'delete',
  });
};
