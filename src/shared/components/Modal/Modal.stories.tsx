import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';

export default {
  component: Modal,
  args: {
    isOpen: true,
  },
} as Meta<typeof Modal>;

export const Default: StoryObj<typeof Modal> = {
  args: {
    title: '알림',
    content: <>modal 입니다.</>,
  },
};

export const HideCancelButton: StoryObj<typeof Modal> = {
  name: '취소 버튼 숨긴 경우',
  args: {
    title: '알림',
    content: <>modal 입니다.</>,
    hideCancelButton: true,
  },
};
