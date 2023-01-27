import classNames from 'classnames/bind';

import styles from './Chip.module.scss';

const cx = classNames.bind(styles);

type ChipProps = {
  label: string;
  type: 'round' | 'squircle';
  variant: 'filled' | 'outlined';
};

const Chip = ({ label, type, variant }: ChipProps) => {
  return <div className={cx('chip', type, variant)}>{label}</div>;
};

export default Chip;
