import { createQuery } from 'react-query-kit';

import type { Alcohol } from '@/shared/types/alcohol';
import { request } from '@/shared/utils/request';

type Variables = Pick<Alcohol, 'alcoholId'>;
type Response = Alcohol;

const getAlcohol = ({ alcoholId }: Variables) => {
  return request<Response>({
    method: 'get',
    url: `/alcohols?alcoholId=${alcoholId}`,
  });
};

export const useGetAlcohol = createQuery<Response, Variables>({
  primaryKey: '/alcohols/:id',
  queryFn: ({ queryKey: [, variables] }) => getAlcohol(variables),
});
