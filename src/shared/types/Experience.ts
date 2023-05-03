import { Alcohol } from './alcohol';

export type Experience = Omit<Alcohol, 'alcoholPercent'> & {
  recordId: number;
  description: string;
  mainPhotoPath: string;
};
