import classNames from 'classnames/bind';

import styles from './Chip.module.scss';

const cx = classNames.bind(styles);

type ChipProps = {
  label: string;
  type: 'Primary' | 'Secondary' | 'Outlined' | 'OutlinedPurple';
  appearance: 'round' | 'squircle';
  // 16 20 22 24 26
  size: 'small' | 'mediumSmall' | 'medium' | 'mediumLarge' | 'large';
};

const Chip = ({ label, type, appearance, size }: ChipProps) => {
  return <div className={cx('chip', type, appearance, size)}>{label}</div>;
};

export default Chip;
