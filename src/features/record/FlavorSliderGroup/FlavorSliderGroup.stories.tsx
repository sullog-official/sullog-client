import FlavorSliderGroup from './FlavorSliderGroup';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: FlavorSliderGroup,
  argTypes: {
    readOnly: { type: 'boolean', defaultValue: false },
  },
} as Meta<typeof FlavorSliderGroup>;

export const Default: StoryObj<typeof FlavorSliderGroup> = {};
