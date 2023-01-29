import TextField from './TextField';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: TextField,
  args: {
    value: '내용',
  },
} as Meta<typeof TextField>;

export const Default: StoryObj<typeof TextField> = {};

export const Editable: StoryObj<typeof TextField> = {
  args: {
    editable: true,
  },
};

export const Labelled: StoryObj<typeof TextField> = {
  args: {
    label: '라벨',
  },
};