import Chip from './Chip';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Chip,
} as Meta<typeof Chip>;

export const PrimaryRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Primary Round',
    type: 'Primary',
    appearance: 'round',
  },
};

export const PrimarySquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Primary Squircle',
    type: 'Primary',
    appearance: 'squircle',
  },
};

export const SecondaryRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Secondary Round',
    type: 'Secondary',
    appearance: 'round',
  },
};

export const SecondarySquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Secondary Squircle',
    type: 'Secondary',
    appearance: 'squircle',
  },
};

export const OutlinedRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Round',
    type: 'Outlined',
    appearance: 'round',
  },
};

export const OutlinedSquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Squircle',
    type: 'Outlined',
    appearance: 'squircle',
  },
};

export const OutlinedPurpleRound: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Purple Round',
    type: 'OutlinedPurple',
    appearance: 'round',
  },
};

export const OutlinedPurpleSquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'Outlined Purple Squircle',
    type: 'OutlinedPurple',
    appearance: 'squircle',
  },
};
