import type { Meta, StoryObj } from '@storybook/react';

import TopNavigator from './TopNavigator';

export default {
  component: TopNavigator,
} as Meta<typeof TopNavigator>;

export const Default: StoryObj<typeof TopNavigator> = {
  args: {
    title: '게시글',
  },
};

export const MySullog: StoryObj<typeof TopNavigator> = {
  args: {
    title: '나의 술로그',
    highlighted: true,
  },
};

export const NeighborsSullog: StoryObj<typeof TopNavigator> = {
  args: {
    title: '이웃 술로그',
    highlighted: true,
  },
};

export const Writing: StoryObj<typeof TopNavigator> = {
  args: {
    title: '게시글',
    extra: (
      <button type="button" style={{ fontSize: '13px', lineHeight: '16px' }}>
        완료
      </button>
    ),
  },
};
