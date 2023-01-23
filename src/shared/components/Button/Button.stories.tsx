import Button from './Button';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Button,
} as Meta<typeof Button>;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: '버튼',
  },
};
