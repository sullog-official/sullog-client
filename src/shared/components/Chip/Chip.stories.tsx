import Chip from './Chip';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Chip,
} as Meta<typeof Chip>;

export const Default: StoryObj<typeof Chip> = {};

export const RoundFilled: StoryObj<typeof Chip> = {
  args: {
    label: 'Round Filled Chip',
    type: 'round',
    variant: 'filled',
  },
};

export const RoundOutlined: StoryObj<typeof Chip> = {
  args: {
    label: 'Round Outlined Chip',
    type: 'round',
    variant: 'outlined',
  },
};

export const SquircleFilled: StoryObj<typeof Chip> = {
  args: {
    label: 'Squircle Filled Chip',
    type: 'squircle',
    variant: 'filled',
  },
};

export const SquircleOutlined: StoryObj<typeof Chip> = {
  args: {
    label: 'Squircle Outlined Chip',
    type: 'squircle',
    variant: 'outlined',
  },
};
