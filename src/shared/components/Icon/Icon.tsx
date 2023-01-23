import { SVGProps } from 'react';

import classNames from 'classnames/bind';
import * as icons from '@/assets/icons';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

export type IconNameType = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconNameType;
  size?: number;
  width?: string;
  height?: string;
  // TODO: theme 추가 후 color prop 타입 수정
  color?: string;
}

const DEFAULT_SIZE = 30;

const Icon = ({
  name,
  size = DEFAULT_SIZE,
  width,
  height,
  color,
  style,
  className,
  ...props
}: IconProps) => {
  const SvgIcon = icons[name];

  return (
    <SvgIcon
      className={cx('icon', color, className)}
      {...props}
      style={{ width: width ?? size, height: height ?? 'auto', ...style }}
    />
  );
};

export default Icon;
