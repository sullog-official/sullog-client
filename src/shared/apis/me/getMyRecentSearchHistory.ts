import { createQuery } from 'react-query-kit';

import { request } from '@/shared/utils/request';

type Response = {
  recentSearchWordList: string[];
};

const getMyRecentSearchHistory = () => {
  return request<Response>({
    method: 'get',
    url: '/members/me/recent-search-history',
  });
};

export const useGetMyRecentSearchHistory = createQuery({
  primaryKey: '/members/me/recent-search-history',
  queryFn: getMyRecentSearchHistory,
});
