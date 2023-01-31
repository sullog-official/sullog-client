import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';
import { IconNameType } from '@/shared/components/Icon/Icon';
import styles from './AlcoholCard.module.scss';

const cx = classNames.bind(styles);

type AlcoholCardProps = {
  name: IconNameType;
  iconSize?: number;
  isClicked: boolean;
};

const AlcoholCard = ({ name, iconSize, isClicked }: AlcoholCardProps) => {
  const svgColor = isClicked ? 'white' : 'black';
  return (
    <button className={cx('button', isClicked && 'clicked')}>
      <Icon name={name} size={iconSize} color={svgColor} />
      <span className={cx('name')}>{name}</span>
    </button>
  );
};

export default AlcoholCard;
