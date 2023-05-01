import type { Meta, StoryObj } from '@storybook/react';

import TopNavigator from './TopNavigator';

export default {
  component: TopNavigator,
} as Meta<typeof TopNavigator>;

export const Default: StoryObj<typeof TopNavigator> = {
  args: {
    type: 'default',
    title: '게시글',
  },
};

export const MySullog: StoryObj<typeof TopNavigator> = {
  args: {
    type: 'personal',
    title: '나의 술로그',
  },
};

export const NeighborsSullog: StoryObj<typeof TopNavigator> = {
  args: {
    type: 'personal',
    title: '이웃 술로그',
  },
};

export const Writing: StoryObj<typeof TopNavigator> = {
  args: {
    type: 'writing',
    title: '게시글',
  },
};
