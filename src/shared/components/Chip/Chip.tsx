import classNames from 'classnames/bind';

import styles from './Chip.module.scss';

const cx = classNames.bind(styles);

type ChipProps = {
  label: string;
  type: 'round' | 'squircle';
  variant: 'filled' | 'outlined';
  writing?: boolean;
  fontColor?: 'default' | 'purple';
};

const Chip = ({ label, type, variant, writing, fontColor }: ChipProps) => {
  return (
    <div className={cx('chip', type, variant, writing && 'writing', fontColor)}>
      {label}
    </div>
  );
};

export default Chip;
