import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import Drawer from './Drawer';

export default {
  component: Drawer,
  args: {
    children: '내용',
  },
} as Meta<typeof Drawer>;

export const Default: StoryFn<typeof Drawer> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);

  return (
    <Drawer {...args} isOpen={isOpen} onClose={onClose}>
      내용
    </Drawer>
  );
};
