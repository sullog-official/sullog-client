import { createInfiniteQuery } from 'react-query-kit';

import { Feed } from '@/shared/types/feed';
import { request } from '@/shared/utils/request';

type Variables = {
  cursor: number;
  limit: number;
};

type PagingInfo = {
  cursor: number;
  limit: number;
};

type Response = {
  allRecordMetaList: Feed[];
  pagingInfo: PagingInfo;
};

const getFeed = ({ cursor, limit }: Variables) => {
  return request<Response>({
    method: 'get',
    url: `records?${cursor ? `cursor=${cursor}` : ''}&limit=${limit}`,
  });
};

export const useGetFeed = createInfiniteQuery({
  primaryKey: '/feed',
  queryFn: ({ queryKey: [, variables] }) => getFeed(variables),
  getNextPageParam: ({ pagingInfo }) => pagingInfo.cursor,
});
