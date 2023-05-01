import { AlcoholPercentFeeling } from '@/shared/types/record/alcoholPercentFeeling';

const alcoholPercentFeelingAlias: Record<AlcoholPercentFeeling, string> = {
  MILD: '연하다',
  MODERATE: '보통이다',
  STRONG: '독하다',
};

export const getAlcoholPercentFeelingLabel = (value: AlcoholPercentFeeling) => {
  return alcoholPercentFeelingAlias[value];
};
