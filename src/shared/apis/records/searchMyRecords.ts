import { createInfiniteQuery } from 'react-query-kit';

import { PagingInfo } from '@/shared/types/paging';
import { RecordMeta } from '@/shared/types/record';
import { generateUrl } from '@/shared/utils/generateUrl';
import { request } from '@/shared/utils/request';

type Variables = {
  keyword: string;
};
type Response = {
  recordMetaList: RecordMeta[];
  pagingInfo: PagingInfo;
};

const searchMyRecords = ({
  keyword,
  cursor,
  limit,
}: Variables & PagingInfo) => {
  return request<Response>({
    method: 'get',
    url: generateUrl({
      url: '/records/me/search',
      params: { cursor, keyword, limit },
    }),
  });
};

const SEARCH_MY_RECORDS_LIMIT = 10;

export const useSearchMyRecords = createInfiniteQuery<Response, Variables>({
  primaryKey: '/records/me/search',
  queryFn: ({ queryKey: [, { keyword }], pageParam }) => {
    return searchMyRecords({
      keyword,
      cursor: pageParam || 1,
      limit: SEARCH_MY_RECORDS_LIMIT,
    });
  },
  getNextPageParam: (lastPage) => {
    return lastPage.pagingInfo.cursor;
  },
});