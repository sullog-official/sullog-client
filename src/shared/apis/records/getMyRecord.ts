import { createQuery } from 'react-query-kit';

import { Alcohol } from '@/shared/types/alcohol';
import { Experience } from '@/shared/types/Experience';
import { request } from '@/shared/utils/request';

type Response = Experience[];

const getMyRecord = () => {
  return request<Response>({
    method: 'get',
    url: `/records/me`,
  });
};

export const useGetMyRecord = createQuery<Response>({
  primaryKey: '/records/me',
  queryFn: ({ queryKey: [,] }) => getMyRecord(),
});
