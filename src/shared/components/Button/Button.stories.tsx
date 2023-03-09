import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

export default {
  component: Button,
  args: {
    children: '버튼',
  },
} as Meta<typeof Button>;

export const Default: StoryObj<typeof Button> = {};

export const Primary: StoryObj<typeof Button> = {
  args: {
    type: 'primary',
    children: 'Primary Button',
  },
};

export const Outline: StoryObj<typeof Button> = {
  args: {
    type: 'outline',
    children: 'Outline Button',
  },
};
