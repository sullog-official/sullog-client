export type Alcohol = {
  alcoholId: number;
  alcoholName: string;
  brandName: string;
  alcoholPercent: number;
  productionLocation: string;
  productionLatitude: number;
  productionLongitude: number;
  alcoholTag: keyof typeof alcoholTagToKor;
  alcoholType: string;
};

export const alcoholTagToKor = {
  SOJU: '소주',
  FRUIT_WINE: '과실주',
  MAKGEOLLI: '막걸리',
  ETC: '기타',
};

export const alcoholTagToEng = Object.fromEntries(
  Object.entries(alcoholTagToKor).map(([key, value]) => [value, key])
);

export enum AlcoholTag {
  '소주' = 'Soju',
  '과실주' = 'FruitWine',
  '막걸리' = 'Makgeolli',
  '기타' = 'Etc',
  '전체' = 'All',
}
