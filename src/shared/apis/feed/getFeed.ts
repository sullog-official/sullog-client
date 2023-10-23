import { createInfiniteQuery } from 'react-query-kit';

import type { Feed } from '@/shared/types/feed';
import type { PagingInfo } from '@/shared/types/paging';
import { request } from '@/shared/utils/request';

type Response = {
  allRecordMetaList: Feed[];
  pagingInfo: PagingInfo;
};

const getFeed = ({ cursor, limit }: PagingInfo) => {
  return request<Response>({
    method: 'get',
    url: `records?${cursor ? `cursor=${cursor}` : ''}&limit=${limit}`,
  });
};

export const useGetFeed = createInfiniteQuery({
  primaryKey: '/feed',
  queryFn: ({ pageParam }) => getFeed({ cursor: pageParam?.cursor, limit: 8 }),
  getNextPageParam: (lastPage) => {
    if (lastPage.pagingInfo.cursor) {
      return { cursor: lastPage.pagingInfo.cursor };
    }
  },
});
