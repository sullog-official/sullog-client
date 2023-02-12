import type { Meta, StoryObj } from '@storybook/react';

import Chip from './Chip';

export default {
  component: Chip,
} as Meta<typeof Chip>;

export const PrimaryRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Primary Round',
    type: 'Primary',
    appearance: 'round',
    size: 'medium',
  },
};

export const PrimarySquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Primary Squircle',
    type: 'Primary',
    appearance: 'squircle',
    size: 'medium',
  },
};

export const SecondaryRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Secondary Round',
    type: 'Secondary',
    appearance: 'round',
    size: 'medium',
  },
};

export const SecondarySquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Secondary Squircle',
    type: 'Secondary',
    appearance: 'squircle',
    size: 'medium',
  },
};

export const OutlinedRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Round',
    type: 'Outlined',
    appearance: 'round',
    size: 'large',
  },
};

export const OutlinedSquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Squircle',
    type: 'Outlined',
    appearance: 'squircle',
    size: 'large',
  },
};

export const OutlinedPurpleRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Purple Round',
    type: 'OutlinedPurple',
    appearance: 'round',
    size: 'mediumSmall',
  },
};

export const OutlinedPurpleSquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Purple Squircle',
    type: 'OutlinedPurple',
    appearance: 'squircle',
    size: 'mediumSmall',
  },
};
