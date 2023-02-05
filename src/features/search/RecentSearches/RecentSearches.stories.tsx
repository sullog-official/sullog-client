import RecentSearches from './RecentSearches';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: RecentSearches,
  args: {
    items: [
      { id: 1, name: '항목1' },
      { id: 2, name: '항목' },
    ],
  },
} as Meta<typeof RecentSearches>;

export const Default: StoryObj<typeof RecentSearches> = {};
