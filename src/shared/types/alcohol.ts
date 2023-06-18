export type Alcohol = {
  alcoholId: number;
  alcoholName: string;
  brandName: string;
  alcoholPercent: number;
  productionLocation: string;
  productionLatitude: number;
  productionLongitude: number;
  alcoholType: string;
};

export enum AlcoholTag {
  'Soju' = '소주',
  'FruitWine' = '과실주',
  'Makgeolli' = '막걸리',
  'Etc' = '기타',
  'All' = '전체',
}
