import classNames from 'classnames/bind';

import AlcoholCategoryTabItem from '@/features/search/components/AlcoholCategoryTabItem';
import { AlcoholCategories } from '@/pages/my/records';

import styles from './AlcoholCategoryTab.module.scss';

const cx = classNames.bind(styles);

type AlcoholCategoryTabProps = {
  alcoholCategories: typeof AlcoholCategories;
  selectedTab: string;
  onTabChange: (alcohol: typeof AlcoholCategories[number]) => void;
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
