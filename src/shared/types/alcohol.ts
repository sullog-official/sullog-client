export type Alcohol = {
  alcoholId: number;
  alcoholName: string;
  brandName: string;
  alcoholPercent: number;
  productionLocation: string;
  productionLatitude: number;
  productionLongitude: number;
  alcoholTag: keyof typeof alcoholTag;
  alcoholType: string;
};

export const alcoholTag = {
  SOJU: '소주',
  FRUIT_WINE: '과실주',
  MAKGEOLLI: '막걸리',
  ETC: '기타',
};

export enum AlcoholTag {
  'Soju' = '소주',
  'FruitWine' = '과실주',
  'Makgeolli' = '막걸리',
  'Etc' = '기타',
  'All' = '전체',
}
