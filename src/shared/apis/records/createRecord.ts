import { createMutation } from 'react-query-kit';

import { Alcohol } from '@/shared/types/alcohol';
import { Record } from '@/shared/types/record';
import { request } from '@/shared/utils/request';

type Variables = {
  photoList: File[];
  recordInfo: Pick<Alcohol, 'alcoholId'> &
    Pick<
      Record,
      | 'title'
      | 'alcoholPercentFeeling'
      | 'flavorTagList'
      | 'scentScore'
      | 'tasteScore'
      | 'textureScore'
      | 'description'
      | 'experienceDate'
    >;
};
type Response = string;

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
