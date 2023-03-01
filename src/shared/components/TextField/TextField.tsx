import classNames from 'classnames/bind';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  type?: 'text' | 'date';
  label?: string;
};

const TextField = ({
  className,
  type = 'text',
  label,
  name,
  ...props
}: TextFieldProps) => {
  return (
    <div className={cx('container', className)}>
      {label && (
        <label htmlFor={name} className={cx('label')}>
          {label}
        </label>
      )}
      <input type={type} name={name} className={cx('input')} {...props} />
    </div>
  );
};

export default TextField;
