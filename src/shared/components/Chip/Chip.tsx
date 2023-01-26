import classNames from 'classnames/bind';

import styles from './Chip.module.scss';

const cx = classNames.bind(styles);

type ChipProps = {
  text: string;
  fontSize: string;
  fontWeight: string;
  padding: string;
  backgroundColor?: string;
  color: string;
  borderRadius: string;
  border?: string;
};

const Chip = ({
  text,
  fontSize,
  fontWeight,
  padding,
  backgroundColor,
  color,
  borderRadius,
  border,
}: ChipProps) => {
  return (
    <div
      className={cx('chip')}
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        padding: padding,
        backgroundColor: backgroundColor,
        color: color,
        borderRadius: borderRadius,
        border: border,
      }}
    >
      {text}
    </div>
  );
};

export default Chip;
