import { Meta, StoryObj } from '@storybook/react';

import DrawerContents from './DrawerContents';

export default {
  component: DrawerContents,
} as Meta<typeof DrawerContents>;

export const Default: StoryObj<typeof DrawerContents> = {
  args: {},
};
