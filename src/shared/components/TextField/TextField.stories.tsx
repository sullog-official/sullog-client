import type { Meta, StoryObj } from '@storybook/react';

import TextField from './TextField';

export default {
  component: TextField,
  args: {
    value: '내용',
  },
} as Meta<typeof TextField>;

export const Default: StoryObj<typeof TextField> = {};

export const Editable: StoryObj<typeof TextField> = {
  args: {
    disabled: true,
  },
};

export const Labelled: StoryObj<typeof TextField> = {
  args: {
    label: '라벨',
  },
};
