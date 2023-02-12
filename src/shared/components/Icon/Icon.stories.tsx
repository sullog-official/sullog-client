import * as icons from '@/assets/icons';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import Icon, { IconNameType } from './Icon';

export default {
  component: Icon,
} as Meta<typeof Icon>;

export const Default: StoryObj<typeof Icon> = {
  args: {
    name: 'Close',
  },
};

export const All: StoryFn<typeof Icon> = (args) => {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(icons).map((name) => (
        <li
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '8px',
          }}
        >
          <Icon {...args} name={name as IconNameType} />
          <p>{name}</p>
        </li>
      ))}
    </ul>
  );
};
