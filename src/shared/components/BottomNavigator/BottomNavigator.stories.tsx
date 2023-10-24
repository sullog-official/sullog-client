import type { Meta, StoryObj } from '@storybook/react';

import BottomNavigator from '@/shared/components/BottomNavigator/BottomNavigator';

export default {
  component: BottomNavigator,
  args: {
    children: '버튼',
  },
} as Meta<typeof BottomNavigator>;

export const Default: StoryObj<typeof BottomNavigator> = {};
