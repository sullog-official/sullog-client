import { AlcoholPercentFeeling } from './alcoholPercentFeeling';
import { FlavorTag } from './flavorTag';

export type Record = {
  recordId: number;
  memberId: number;
  alcoholId: number;
  title: string;
  photoPathList: string[];
  alcoholPercentFeeling: AlcoholPercentFeeling;
  flavorTagList: FlavorTag[];
  scentScore: number;
  tasteScore: number;
  textureScore: number;
  description: string;
  experienceDate: string;
};
