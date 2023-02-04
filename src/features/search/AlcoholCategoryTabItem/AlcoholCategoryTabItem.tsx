import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';
import { IconNameType } from '@/shared/components/Icon/Icon';
import styles from './AlcoholCategoryTabItem.module.scss';

const cx = classNames.bind(styles);

type AlcoholCategoryTabItemProps = {
  name: IconNameType;
  iconSize?: number;
  isSelected: boolean;
};

const changeAlcoholNameToKorean = (name: string) => {
  switch (name) {
    case 'Soju':
      return '소주';
    case 'FruitWine':
      return '과실주';
    case 'Makgeolli':
      return '막걸리';
    case 'Etc':
      return '기타주';
    default:
      return '전체';
  }
};

const AlcoholCategoryTabItem = ({
  name,
  iconSize,
  isSelected,
}: AlcoholCategoryTabItemProps) => {
  const svgColor = isSelected ? 'white' : 'black';
  return (
    <button type="button" className={cx('button', isSelected && 'clicked')}>
      <Icon name={name} size={iconSize} color={svgColor} />
      <span className={cx('name')}>{changeAlcoholNameToKorean(name)}</span>
    </button>
  );
};

export default AlcoholCategoryTabItem;
