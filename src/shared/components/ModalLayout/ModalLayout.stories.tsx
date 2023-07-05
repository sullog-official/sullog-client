import type { Meta, StoryObj } from '@storybook/react';

import ModalLayout from './ModalLayout';

export default {
  component: ModalLayout,
  args: {
    isOpen: true,
  },
} as Meta<typeof ModalLayout>;

export const Default: StoryObj<typeof ModalLayout> = {};
