import classNames from 'classnames/bind';

import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

type SkeletonProps = {
  width: string;
  height: string;
  radius?: string;
  padding?: string;
  margin?: string;
  style?: React.CSSProperties;
};

const Skeleton = ({
  width,
  height,
  radius = '10px',
  padding,
  margin,
  style,
}: SkeletonProps) => {
  return (
    <div
      className={cx('skeleton')}
      style={{
        ...style,
        width,
        height,
        borderRadius: radius,
        padding,
        margin,
      }}
    />
  );
};

export default Skeleton;
