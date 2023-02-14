import classNames from 'classnames/bind';

import AlcoholCategoryTabItem from '@/features/search/AlcoholCategoryTabItem';
import { AlcoholCategoryTabItemProps } from '@/features/search/AlcoholCategoryTabItem/AlcoholCategoryTabItem';

import styles from './AlcoholCategoryTab.module.scss';

const cx = classNames.bind(styles);

type AlcoholCategoryTabProps = {
  alcoholCategories: string[];
  selectedTab: string;
  onTabChange: (alcohol: AlcoholCategoryTabItemProps['alcohol']) => void;
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
