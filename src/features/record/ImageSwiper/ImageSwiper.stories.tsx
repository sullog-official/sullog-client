import type { Meta, StoryObj } from '@storybook/react';

import ImageSwiper from './ImageSwiper';

export default {
  component: ImageSwiper,
} as Meta<typeof ImageSwiper>;

export const Default: StoryObj<typeof ImageSwiper> = {
  args: {
    mode: 'read',
    images: [
      'https://i.pinimg.com/564x/30/8d/7d/308d7d49609c1172b02297772e1b885e.jpg',
      'https://i.pinimg.com/564x/d6/da/c9/d6dac9be66de47795d403ed094b12838.jpg',
      'https://i.pinimg.com/564x/8b/a8/f6/8ba8f6e12a8f4a78948ce18f53be1416.jpg',
    ],
  },
};

export const ReadMode_SingleImage: StoryObj<typeof ImageSwiper> = {
  args: {
    mode: 'read',
    images: [
      'https://i.pinimg.com/564x/8b/a8/f6/8ba8f6e12a8f4a78948ce18f53be1416.jpg',
    ],
  },
};

export const ReadMode_MultiImage: StoryObj<typeof ImageSwiper> = {
  args: {
    mode: 'read',
    images: [
      'https://i.pinimg.com/564x/30/8d/7d/308d7d49609c1172b02297772e1b885e.jpg',
      'https://i.pinimg.com/564x/d6/da/c9/d6dac9be66de47795d403ed094b12838.jpg',
      'https://i.pinimg.com/564x/8b/a8/f6/8ba8f6e12a8f4a78948ce18f53be1416.jpg',
    ],
  },
};

export const EditMode_SingleImage: StoryObj<typeof ImageSwiper> = {
  args: {
    mode: 'edit',
    images: [
      'https://i.pinimg.com/564x/30/8d/7d/308d7d49609c1172b02297772e1b885e.jpg',
    ],
  },
};

export const EditMode_MultiImages: StoryObj<typeof ImageSwiper> = {
  args: {
    mode: 'edit',
    max: 3,
    images: [
      'https://i.pinimg.com/564x/30/8d/7d/308d7d49609c1172b02297772e1b885e.jpg',
      'https://i.pinimg.com/564x/d6/da/c9/d6dac9be66de47795d403ed094b12838.jpg',
      'https://i.pinimg.com/564x/8b/a8/f6/8ba8f6e12a8f4a78948ce18f53be1416.jpg',
    ],
    onImagesChange: (imageUrl) => console.log(imageUrl),
  },
};
