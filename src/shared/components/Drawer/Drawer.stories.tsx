import type { Meta, StoryObj } from '@storybook/react';

import Drawer from './Drawer';

export default {
  component: Drawer,
  args: {
    isOpen: true,
    children: '내용',
  },
} as Meta<typeof Drawer>;

export const Default: StoryObj<typeof Drawer> = {};
