import { Alcohol } from '../alcohol';

import { AlcoholPercentFeeling } from './alcoholPercentFeeling';
import { FlavorTag } from './flavorTag';

export type Record = {
  recordId: number;
  memberId: number;
  alcoholId: number;
  photoPathList: string[];
  alcoholPercentFeeling: AlcoholPercentFeeling;
  flavorTagList: FlavorTag[];
  starScore: number;
  scentScore: number;
  tasteScore: number;
  textureScore: number;
  description: string;
  experienceDate: string;
};

export type RecordMeta = Pick<Record, 'recordId' | 'description'> &
  Pick<
    Alcohol,
    | 'alcoholId'
    | 'alcoholName'
    | 'productionLocation'
    | 'productionLatitude'
    | 'productionLongitude'
    | 'alcoholTag'
    | 'brandName'
  > & {
    mainPhotoPath: string;
  };
