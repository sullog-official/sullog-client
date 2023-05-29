import type { Meta, StoryObj } from '@storybook/react';

import StatisticsDrawer from './StatisticsDrawer';

export default {
  component: StatisticsDrawer,
  args: {
    statistics: {
      memberId: 1,
      email: 'test@test.com',
      nickname: 'test',
      recordStatisticsMap: {
        막걸리: 1,
        소주: 2,
        맥주: 3,
        와인: 4,
        양주: 5,
      },
    },
  },
} as Meta<typeof StatisticsDrawer>;

export const Default: StoryObj<typeof StatisticsDrawer> = {};
