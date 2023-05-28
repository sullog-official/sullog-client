import { createMutation } from 'react-query-kit';

import { request } from '@/shared/utils/request';

const resetMyRecentSearchHistory = () => {
  return request({
    method: 'delete',
    url: '/members/me/recent-search-history',
  });
};

export const useResetMyRecentSearchHistory = createMutation({
  mutationFn: resetMyRecentSearchHistory,
});
