import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import type { FlavorTag } from '@/shared/types/record/flavorTag';

import DetailFlavorInput from './DetailFlavorInput';

export default {
  component: DetailFlavorInput,
} as Meta<typeof DetailFlavorInput>;

export const Default: StoryFn<typeof DetailFlavorInput> = () => {
  const [value, setValue] = useState<FlavorTag[]>([]);

  return <DetailFlavorInput value={value} onChange={setValue} />;
};
