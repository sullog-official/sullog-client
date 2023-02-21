import type { Meta, StoryObj } from '@storybook/react';

import Chip from '../Chip';

import Accordion from './Accordion';

export default {
  component: Accordion,
} as Meta<typeof Accordion>;

export const FlowerFlavorAccordion: StoryObj<typeof Accordion> = {
  args: {
    header: '꽃',
    children: (
      <div>
        {[
          '국화',
          '매화',
          '아카시아',
          '연꽃',
          '해바라기',
          '코스모스',
          '장미',
          '민들레',
        ].map((item) => {
          return (
            <button type="button" key={item} style={{ margin: '6px 8px 0 0' }}>
              <Chip
                label={item}
                type="Secondary"
                appearance="squircle"
                size="medium"
              />
            </button>
          );
        })}
      </div>
    ),
  },
};
