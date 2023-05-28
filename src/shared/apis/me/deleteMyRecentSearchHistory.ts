import { createMutation } from 'react-query-kit';

import { request } from '@/shared/utils/request';

type Variables = {
  keyword: string;
};

const deleteMyRecentSearchHistory = ({ keyword }: Variables) => {
  return request({
    method: 'delete',
    url: `/members/me/recent-search-history/${keyword}`,
  });
};

export const useDeleteMyRecentSearchHistory = createMutation({
  mutationFn: deleteMyRecentSearchHistory,
});
