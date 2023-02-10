import AlcoholPreview from './AlcoholPreview';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AlcoholPreview,
  args: {
    name: '술 이름',
    brand: '브랜드',
    description:
      '테이스팅, 시식, 시음, 맛 평가. 식품 의 질을 맛으로 평가하는 것. 특히 버터, 오일, 푸아그라, 초콜릿 등은 전문 맛 감정사가 있다. 파리 시 연구소에',
    imgSrc: 'https://via.placeholder.com/100',
  },
} as Meta<typeof AlcoholPreview>;

export const Default: StoryObj<typeof AlcoholPreview> = {};
