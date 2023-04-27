import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './SearchBar';

export default {
  component: SearchBar,
} as Meta<typeof SearchBar>;

export const ExperienceSearchBar: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: 'Search',
  },
};

export const AlcoholSearchBar: StoryObj<typeof SearchBar> = {
  args: {
    placeholder: '마신 술 이름을 입력해주세요.',
    filterItems: ['소주', '과실주', '막걸리', '기타', '전체'],
  },
};
