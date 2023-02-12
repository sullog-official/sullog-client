import BottomNavigator from '@/shared/components/BottomNavigator/BottomNavigator';

import { Meta, StoryObj } from '@storybook/react';

export default {
  component: BottomNavigator,
  args: {
    children: '버튼',
  },
} as Meta<typeof BottomNavigator>;

export const Default: StoryObj<typeof BottomNavigator> = {};
