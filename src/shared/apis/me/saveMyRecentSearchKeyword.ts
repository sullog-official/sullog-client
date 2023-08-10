import { createMutation } from 'react-query-kit';

import { request } from '@/shared/utils/request';

type Variables = {
  keyword: string;
};

const saveMyRecentSearchKeyword = ({ keyword }: Variables) => {
  return request({
    method: 'post',
    url: '/members/me/recent-search-history',
    data: { keyword },
  });
};

export const useSaveMyRecentSearchKeyword = createMutation({
  mutationFn: saveMyRecentSearchKeyword,
});
