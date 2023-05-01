import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import Rating from './Rating';

export default {
  component: Rating,
  args: {
    label: '별점',
    value: 3,
  },
} as Meta<typeof Rating>;

export const Default: StoryFn<typeof Rating> = (args) => {
  const [value, setValue] = useState(args.value);

  return <Rating {...args} value={value} onChange={setValue} />;
};
