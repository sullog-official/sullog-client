import type { Meta, StoryObj } from '@storybook/react';

import DoughnutChart from './DoughnutChart';

export default {
  component: DoughnutChart,
} as Meta<typeof DoughnutChart>;

export const Default: StoryObj<typeof DoughnutChart> = {
  args: {},
};
