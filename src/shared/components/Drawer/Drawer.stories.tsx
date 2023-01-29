import Drawer from './Drawer';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Drawer,
  args: {
    children: '내용',
  },
} as Meta<typeof Drawer>;

export const Default: StoryObj<typeof Drawer> = {};
