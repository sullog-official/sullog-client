import Accordion from './Accordion';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Accordion,
} as Meta<typeof Accordion>;

export const FlowerFlavorAccordion: StoryObj<typeof Accordion> = {
  args: {
    label: '꽃',
    items: [
      '국화',
      '매화',
      '아카시아',
      '연꽃',
      '해바라기',
      '코스모스',
      '장미',
      '민들레',
    ],
  },
};
