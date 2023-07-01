import type { Meta, StoryObj } from '@storybook/react';

import AlcoholCategoryTab from './AlcoholCategoryTab';

export default {
  component: AlcoholCategoryTab,
} as Meta<typeof AlcoholCategoryTab>;

export const Default: StoryObj<typeof AlcoholCategoryTab> = {
  args: {
    selectedTab: '소주',
  },
};
