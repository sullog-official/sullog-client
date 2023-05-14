import classNames from 'classnames/bind';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type BaseButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonType = 'primary' | 'outline';

type ButtonProps = Omit<BaseButtonProps, 'type'> & {
  /** 버튼 타입 */
  type?: ButtonType;
  buttonType?: BaseButtonProps['type'];
  children: React.ReactNode;
};

const Button = ({
  type = 'primary',
  buttonType = 'button',
  children = '',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
      className={cx('button', type, className)}
    >
      {children}
    </button>
  );
};

export default Button;
