import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';
import { IconNameType } from '@/shared/components/Icon/Icon';
import { AlcoholTag } from '@/shared/types/alcohol';

import styles from './AlcoholCategoryTabItem.module.scss';

const cx = classNames.bind(styles);

type AlcoholCategoryTabItemProps = {
  alcohol: keyof typeof AlcoholTag;
  isSelected: boolean;
  setSelectedTab: (alcohol: AlcoholCategoryTabItemProps['alcohol']) => void;
};

const AlcoholCategoryTabItem = ({
  alcohol,
  isSelected,
  setSelectedTab,
}: AlcoholCategoryTabItemProps) => {
  const svgColor = isSelected ? 'white' : 'black';

  const onClickTab = () => {
    setSelectedTab(alcohol);
  };

  return (
    <button
      type="button"
      onClick={onClickTab}
      className={cx('button', isSelected && 'clicked')}
    >
      {alcohol === 'All' ? (
        <div>All</div>
      ) : (
        <Icon name={alcohol} size={20} color={svgColor} />
      )}
      <span className={cx('name')}>{AlcoholTag[alcohol]}</span>
    </button>
  );
};

export default AlcoholCategoryTabItem;
