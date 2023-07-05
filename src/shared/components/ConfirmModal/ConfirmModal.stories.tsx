import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import useConfirm from '@/shared/hooks/useConfirm';

import Button from '../Button';
import PageLayout from '../PageLayout';

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

export const UseConfirmFunction: StoryFn<typeof ConfirmModal> = () => {
  const { confirm } = useConfirm();

  const asyncPrint = (string: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(string);
        resolve(true);
      }, 1000);
    });
  };

  const handleClick = async () => {
    const aModalResult = await confirm({
      message: 'a 모달입니다.',
      description:
        '확인을 누르면 비동기 작업이 실행되고\n작업이 끝난 후 b 모달이 열립니다.',
      onOk: async () => {
        await asyncPrint('a 확인');
      },
      onCancel: () => {
        console.log('a 취소');
      },
    });

    if (aModalResult) {
      await confirm({
        message: 'bbbb',
        description: 'a 모달에서 확인을 눌렀을 경우에만 열립니다',
        onOk: async () => {
          await asyncPrint('b 확인');
        },
        onCancel: async () => {
          console.log('b 취소');
        },
      });
    }
  };

  return (
    <PageLayout>
      <Button onClick={handleClick}>confirm</Button>
    </PageLayout>
  );
};

UseConfirmFunction.storyName = 'confirm 함수 사용';
