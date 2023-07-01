import type { Meta, StoryObj } from '@storybook/react';

import AlcoholCard from './AlcoholCategoryTabItem';

export default {
  component: AlcoholCard,
} as Meta<typeof AlcoholCard>;

export const DefaultSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '소주',
    isSelected: false,
  },
};

export const SelectedSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '소주',
    isSelected: true,
  },
};

export const DefaultFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '과실주',
    isSelected: false,
  },
};

export const SelectedFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '과실주',
    isSelected: true,
  },
};

export const DefaultMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '막걸리',
    isSelected: false,
  },
};

export const SelectedMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '막걸리',
    isSelected: true,
  },
};

export const DefaultEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '기타',
    isSelected: false,
  },
};

export const SelectedEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '기타',
    isSelected: true,
  },
};

export const DefaultAll: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '전체',
    isSelected: false,
  },
};

export const SelectedAll: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: '전체',
    isSelected: true,
  },
};
