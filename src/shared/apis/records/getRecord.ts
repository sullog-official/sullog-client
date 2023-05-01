import { createQuery } from 'react-query-kit';

import { Alcohol } from '@/shared/types/alcohol';
import { Record } from '@/shared/types/record';
import { request } from '@/shared/utils/request';

type Variables = Pick<Record, 'recordId'>;
type Response = {
  record: Record;
  alcoholInfo: Alcohol;
};

const getRecord = ({ recordId }: Variables) => {
  return request<Response>({
    method: 'get',
    url: `/records/${recordId}`,
  });
};

export const useGetRecord = createQuery<Response, Variables>({
  primaryKey: '/records/:id',
  queryFn: ({ queryKey: [, variables] }) => getRecord(variables),
});
