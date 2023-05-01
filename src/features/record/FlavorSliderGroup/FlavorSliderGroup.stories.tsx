import type { Meta, StoryObj } from '@storybook/react';

import FlavorSliderGroup from './FlavorSliderGroup';

export default {
  component: FlavorSliderGroup,
  argTypes: {
    readOnly: { type: 'boolean', defaultValue: false },
  },
} as Meta<typeof FlavorSliderGroup>;

export const Default: StoryObj<typeof FlavorSliderGroup> = {};
