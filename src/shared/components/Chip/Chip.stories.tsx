import Chip from './Chip';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Chip,
} as Meta<typeof Chip>;

export const Writing: StoryObj<typeof Chip> = {
  args: {
    label: 'Writing',
    type: 'squircle',
    variant: 'filled',
    writing: true,
  },
};

export const FilledSquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'FilledSquircle',
    type: 'squircle',
    variant: 'filled',
  },
};

export const FilledRound: StoryObj<typeof Chip> = {
  args: {
    label: 'FilledRound',
    type: 'round',
    variant: 'filled',
  },
};

export const OutlinedSquircle: StoryObj<typeof Chip> = {
  args: {
    label: 'OutlinedSquircle',
    type: 'squircle',
    variant: 'outlined',
  },
};

export const OutlinedRound: StoryObj<typeof Chip> = {
  args: {
    label: 'OutlinedRound',
    type: 'round',
    variant: 'outlined',
  },
};

export const OutlinedRoundPurpleFont: StoryObj<typeof Chip> = {
  args: {
    label: 'OutlinedRound',
    type: 'round',
    variant: 'outlined',
    fontColor: 'purple',
  },
};
