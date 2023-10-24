import { createMutation } from 'react-query-kit';

import type { Alcohol } from '@/shared/types/alcohol';
import type { Record } from '@/shared/types/record';
import { request } from '@/shared/utils/request';

type Variables = {
  photoList: File[];
  recordInfo: Pick<Alcohol, 'alcoholId'> &
    Pick<
      Record,
      | 'experienceDate'
      | 'alcoholPercentFeeling'
      | 'starScore'
      | 'scentScore'
      | 'tasteScore'
      | 'textureScore'
      | 'flavorTagList'
      | 'description'
    >;
};
type Response = Pick<Record, 'recordId'>;

const createRecord = ({ photoList, recordInfo }: Variables) => {
  const formData = new FormData();
  photoList.map((photo) => {
    formData.append('photoList', photo);
  });
  formData.append(
    'recordInfo',
    new Blob([JSON.stringify(recordInfo, null, 2)], {
      type: 'application/json',
    })
  );

  return request<Response>({
    method: 'post',
    url: '/records',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
};

export const useCreateRecord = createMutation({
  mutationFn: createRecord,
});
