import { useState } from 'react';
import Slider from './Slider';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

export default {
  component: Slider,
  argTypes: {
    min: { type: 'number', defaultValue: 1 },
    max: { type: 'number', defaultValue: 5 },
    minLabel: { type: 'string' },
    maxLabel: { type: 'string' },
  },
} as Meta<typeof Slider>;

export const Default: StoryFn<typeof Slider> = (args) => {
  const [value, setValue] = useState(3);

  return (
    <Slider
      {...args}
      value={value}
      onChange={setValue}
      style={{ width: '200px' }}
    />
  );
};

export const FlavorSlider: StoryObj<typeof Slider> = {
  args: {
    value: 3,
    min: 1,
    max: 5,
    minLabel: '달다',
    maxLabel: '쓰다',
    style: { width: '200px' },
  },
};
