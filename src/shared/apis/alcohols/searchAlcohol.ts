import { createInfiniteQuery, createQuery } from 'react-query-kit';

import type { Alcohol } from '@/shared/types/alcohol';
import type { PagingInfo } from '@/shared/types/paging';
import { request } from '@/shared/utils/request';

type Variables = { keyword: string } & PagingInfo;
type Response = { alcoholInfoDtoList: Alcohol[]; pagingInfoDto: PagingInfo };

const searchAlcohol = ({ keyword, cursor = 1, limit = 20 }: Variables) => {
  return request<Response>({
    method: 'get',
    url: `/alcohols/search?keyword=${keyword}&${
      cursor ? `cursor=${cursor}` : ''
    }&limit=${limit}`,
  });
};

export const useSearchAlcohol = createInfiniteQuery<Response, Variables>({
  primaryKey: '/alcohols/search',
  queryFn: ({ queryKey: [, variables] }) => searchAlcohol(variables),
  getNextPageParam: ({ pagingInfoDto }) => pagingInfoDto.cursor,
});
