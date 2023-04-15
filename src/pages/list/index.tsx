import classNames from 'classnames/bind';
import { useState } from 'react';

import AlcoholPreview from '@/features/alcohol/components/AlcoholPreview';
import AlcoholCategoryTab from '@/features/search/components/AlcoholCategoryTab';
import BottomNavigator from '@/shared/components/BottomNavigator';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

// TODO: apis 연결시 삭제
const sampleDescription =
  '테이스팅, 시식, 시음, 맛 평가. 식품의 질을 맛으로 평가하는 것. 특히버터, 오일, 푸아그라, 초콜릿 등은 전문 맛 감정사가 있다. 파리 시 연구소에';

export const AlcoholCategories = [
  'Soju',
  'FruitWine',
  'Makgeolli',
  'Etc',
  'All',
] as const;

const List = () => {
  const [selectedTab, setSelectedTab] =
    useState<typeof AlcoholCategories[number]>('Soju');

  return (
    <>
      <TopNavigator type={'personal'} title={'나의 술로그'} />
      <main>
        <AlcoholCategoryTab
          alcoholCategories={AlcoholCategories}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        <div className={cx('preview-wrapper')}>
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
          <AlcoholPreview
            name={'술 이름'}
            brand={'브랜드'}
            description={sampleDescription}
            imgSrc={'https://via.placeholder.com/100'}
          />
        </div>
      </main>
      <BottomNavigator />
    </>
  );
};

export default List;
