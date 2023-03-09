import type { Meta, StoryObj } from '@storybook/react';

import TextField from './TextField';

export default {
  component: TextField,
  args: {
    value: '내용',
  },
} as Meta<typeof TextField>;

export const Default: StoryObj<typeof TextField> = {};

export const Disabled: StoryObj<typeof TextField> = {
  args: {
    value: '내용',
    disabled: true,
  },
};

export const Labelled: StoryObj<typeof TextField> = {
  args: {
    label: '라벨',
    placeholder: '내용을 입력해주세요.',
  },
};
