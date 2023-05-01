import classNames from 'classnames/bind';
import { forwardRef, ForwardedRef } from 'react';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  type?: 'text' | 'date';
  label?: string;
};

const TextField = forwardRef(
  (
    { className, type = 'text', label, name, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={cx('container', className)}>
        {label && (
          <label htmlFor={name} className={cx('label')}>
            {label}
          </label>
        )}
        <input type={type} name={name} className={cx('input')} {...props} />
      </div>
    );
  }
);
TextField.displayName = 'TextField';

export default TextField;
