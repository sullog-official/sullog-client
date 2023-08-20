import type { Meta, StoryObj } from '@storybook/react';

import * as MoonAnimationData from '@/assets/lotties/moon_motion.json';

import Lottie from './Lottie';

export default {
  component: Lottie,
} as Meta<typeof Lottie>;

export const Default: StoryObj<typeof Lottie> = {
  args: {
    animationData: MoonAnimationData,
  },
};
