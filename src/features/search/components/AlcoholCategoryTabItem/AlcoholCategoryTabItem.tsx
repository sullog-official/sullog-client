import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';
import { AlcoholTag } from '@/shared/types/alcohol';

import styles from './AlcoholCategoryTabItem.module.scss';

const cx = classNames.bind(styles);

type AlcoholCategoryTabItemProps = {
  alcohol: keyof typeof AlcoholTag;
  isSelected: boolean;
  setSelectedTab: (alcohol: string) => void;
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
      {alcohol === '전체' ? (
        <div>all</div>
      ) : (
        <Icon name={AlcoholTag[alcohol]} size={20} color={svgColor} />
      )}
      <span className={cx('name')}>{alcohol}</span>
    </button>
  );
};

export default AlcoholCategoryTabItem;
