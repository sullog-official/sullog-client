import AlcoholCard from './AlcoholCategoryTabItem';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AlcoholCard,
} as Meta<typeof AlcoholCard>;

export const DefaultSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'Soju',
    iconSize: 16,
    isSelected: false,
  },
};

export const DefaultFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'FruitWine',
    iconSize: 14,
    isSelected: false,
  },
};

export const DefaultMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'Makgeolli',
    iconSize: 20,
    isSelected: false,
  },
};

export const DefaultEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'Etc',
    iconSize: 22,
    isSelected: false,
  },
};

export const DefaultAll: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'All',
    iconSize: 14,
    isSelected: false,
  },
};

export const ClickedSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'Soju',
    iconSize: 16,
    isSelected: true,
  },
};

export const ClickedFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'FruitWine',
    iconSize: 14,
    isSelected: true,
  },
};

export const ClickedMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'Makgeolli',
    iconSize: 20,
    isSelected: true,
  },
};

export const ClickedEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'Etc',
    iconSize: 22,
    isSelected: true,
  },
};

export const ClickedAll: StoryObj<typeof AlcoholCard> = {
  args: {
    name: 'All',
    iconSize: 14,
    isSelected: true,
  },
};
