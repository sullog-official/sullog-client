import AlcoholCard from './AlcoholCard';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AlcoholCard,
} as Meta<typeof AlcoholCard>;

export const DefaultSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '소주',
    iconSize: 16,
    isClicked: false,
  },
};

export const DefaultFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '과실주',
    iconSize: 14,
    isClicked: false,
  },
};

export const DefaultMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '막걸리',
    iconSize: 20,
    isClicked: false,
  },
};

export const DefaultEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '기타',
    iconSize: 22,
    isClicked: false,
  },
};

export const DefaultAll: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '전체',
    iconSize: 14,
    isClicked: false,
  },
};

export const ClickedSoju: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '소주',
    iconSize: 16,
    isClicked: true,
  },
};

export const ClickedFruitWine: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '과실주',
    iconSize: 14,
    isClicked: true,
  },
};

export const ClickedMakgeolli: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '막걸리',
    iconSize: 20,
    isClicked: true,
  },
};

export const ClickedEtc: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '기타',
    iconSize: 22,
    isClicked: true,
  },
};

export const ClickedAll: StoryObj<typeof AlcoholCard> = {
  args: {
    name: '전체',
    iconSize: 14,
    isClicked: true,
  },
};
