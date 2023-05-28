import { createQuery } from 'react-query-kit';

import { Statistics } from '@/shared/types/record/statistics';
import { request } from '@/shared/utils/request';

const getStatistics = () => {
  return request<Statistics>({
    method: 'get',
    url: '/records/me/statistics',
  });
};

export const useGetStatistics = createQuery({
  primaryKey: '/statistics',
  queryFn: getStatistics,
});
