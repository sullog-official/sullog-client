import { Alcohol } from '@/shared/types/alcohol';
import { Record } from '@/shared/types/record';

export type Feed = Alcohol &
  Pick<Record, 'memberId' | 'recordId' | 'description'> & {
    mainPhotoPath: string;
  };
