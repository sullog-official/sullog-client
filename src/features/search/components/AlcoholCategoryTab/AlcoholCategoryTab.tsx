import classNames from 'classnames/bind';
import { Dispatch, SetStateAction } from 'react';

import AlcoholCategoryTabItem from '@/features/search/components/AlcoholCategoryTabItem';
import { ALCOHOL_CATEGORIES } from '@/shared/constants/alcohol';
import { AlcoholTag } from '@/shared/types/alcohol';

import styles from './AlcoholCategoryTab.module.scss';

const cx = classNames.bind(styles);
const ALL = '전체';

type AlcoholCategoryTabProps = {
  selectedTab: string;
  onTabChange: Dispatch<SetStateAction<string>>;
};

const AlcoholCategoryTab = ({
  selectedTab,
  onTabChange,
}: AlcoholCategoryTabProps) => {
  return (
    <div className={cx('wrapper')}>
      {[...ALCOHOL_CATEGORIES, ALL].map((category: string) => (
        <AlcoholCategoryTabItem
          key={category}
          alcohol={category as keyof typeof AlcoholTag}
          isSelected={selectedTab === category}
          setSelectedTab={onTabChange}
        />
      ))}
    </div>
  );
};

export default AlcoholCategoryTab;
