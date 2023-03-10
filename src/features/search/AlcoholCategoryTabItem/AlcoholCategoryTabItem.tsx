import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';

import styles from './AlcoholCategoryTabItem.module.scss';

const cx = classNames.bind(styles);

type AlcoholCategoryTabItemProps = {
  alcohol: 'Soju' | 'FruitWine' | 'Makgeolli' | 'Etc' | 'All';
  isSelected: boolean;
  setSelectedTab: (alcohol: AlcoholCategoryTabItemProps['alcohol']) => void;
};

const matchAlcoholIconSpec = (
  alcohol: AlcoholCategoryTabItemProps['alcohol']
) => {
  switch (alcohol) {
    case 'Soju':
      return {
        size: 16,
        label: '소주',
      };
    case 'FruitWine':
      return {
        size: 14,
        label: '과실주',
      };
    case 'Makgeolli':
      return {
        size: 20,
        label: '막걸리',
      };
    case 'Etc':
      return {
        size: 20,
        label: '기타',
      };
    case 'All':
      return {
        size: 14,
        label: '전체',
      };
  }
};

const AlcoholCategoryTabItem = ({
  alcohol,
  isSelected,
  setSelectedTab,
}: AlcoholCategoryTabItemProps) => {
  const svgColor = isSelected ? 'white' : 'black';
  const { size, label } = matchAlcoholIconSpec(alcohol);

  const onClickTab = () => {
    setSelectedTab(alcohol);
  };

  return (
    <button
      type="button"
      onClick={onClickTab}
      className={cx('button', isSelected && 'clicked')}
    >
      <Icon name={alcohol} size={size} color={svgColor} />
      <span className={cx('name')}>{label}</span>
    </button>
  );
};

export default AlcoholCategoryTabItem;
