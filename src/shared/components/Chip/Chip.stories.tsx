import Chip from './Chip';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Chip,
} as Meta<typeof Chip>;

export const Default: StoryObj<typeof Chip> = {
  args: {
    children: 'Chip',
  },
};
