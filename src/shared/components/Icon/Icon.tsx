import * as icons from '@/assets/icons';
import { Color } from '@/assets/styles/themes';

import classNames from 'classnames/bind';
import { SVGProps } from 'react';

import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

export type IconNameType = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconNameType;
  size?: number;
  width?: string;
  height?: string;
  color?: Color;
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
