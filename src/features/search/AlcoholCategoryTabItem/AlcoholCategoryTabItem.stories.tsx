import AlcoholCard from './AlcoholCategoryTabItem';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AlcoholCard,
} as Meta<typeof AlcoholCard>;

export const DefaultSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'Soju',
    isSelected: false,
  },
};

export const SelectedSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'Soju',
    isSelected: true,
  },
};

export const DefaultFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'FruitWine',
    isSelected: false,
  },
};

export const SelectedFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'FruitWine',
    isSelected: true,
  },
};

export const DefaultMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'Makgeolli',
    isSelected: false,
  },
};

export const SelectedMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'Makgeolli',
    isSelected: true,
  },
};

export const DefaultEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'Etc',
    isSelected: false,
  },
};

export const SelectedEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'Etc',
    isSelected: true,
  },
};

export const DefaultAll: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'All',
    isSelected: false,
  },
};

export const SelectedAll: StoryObj<typeof AlcoholCard> = {
  args: {
    alcohol: 'All',
    isSelected: true,
  },
};
