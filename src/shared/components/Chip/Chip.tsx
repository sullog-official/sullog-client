import classNames from 'classnames/bind';

import styles from './Chip.module.scss';

const cx = classNames.bind(styles);

type ChipProps = {
  label: string;
  type: 'Primary' | 'Secondary' | 'Outlined' | 'OutlinedPurple';
  appearance: 'round' | 'squircle';
};

const Chip = ({ label, type, appearance }: ChipProps) => {
  return <div className={cx('chip', type, appearance)}>{label}</div>;
};

export default Chip;
