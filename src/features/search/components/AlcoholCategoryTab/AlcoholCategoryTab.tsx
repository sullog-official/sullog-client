import classNames from 'classnames/bind';

import AlcoholCategoryTabItem from '@/features/search/components/AlcoholCategoryTabItem';
import { AlcoholTag } from '@/shared/types/alcohol';

import styles from './AlcoholCategoryTab.module.scss';

const cx = classNames.bind(styles);

type AlcoholCategoryTabProps = {
  alcoholCategories: (keyof typeof AlcoholTag)[];
  selectedTab: string;
  onTabChange: (alcohol: keyof typeof AlcoholTag) => void;
};

const AlcoholCategoryTab = ({
  alcoholCategories,
  selectedTab,
  onTabChange,
}: AlcoholCategoryTabProps) => {
  return (
    <div className={cx('wrapper')}>
      {alcoholCategories.map((category: any) => {
        return (
          <AlcoholCategoryTabItem
            key={category}
            alcohol={category}
            isSelected={selectedTab === category}
            setSelectedTab={onTabChange}
          />
        );
      })}
    </div>
  );
};

export default AlcoholCategoryTab;
