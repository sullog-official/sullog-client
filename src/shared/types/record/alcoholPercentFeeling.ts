const alcoholPercentFeelings = ['MILD', 'MODERATE', 'STRONG'] as const;
export type AlcoholPercentFeeling = typeof alcoholPercentFeelings[number];
