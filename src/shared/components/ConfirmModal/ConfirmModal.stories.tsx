import type { Meta, StoryObj } from '@storybook/react';

import ConfirmModal from './ConfirmModal';

export default {
  component: ConfirmModal,
  args: {
    isOpen: true,
    message: '로그아웃 하시겠습니까?',
    description: '진짜 진짜 진짜 진짜 진짜로 로그아웃 됩니다',
  },
} as Meta<typeof ConfirmModal>;

export const Default: StoryObj<typeof ConfirmModal> = {};
