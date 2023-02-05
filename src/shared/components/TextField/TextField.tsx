import classNames from 'classnames/bind';
import React from 'react';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

interface TextFieldProps {
  value: string;
  label?: string;
  disabled?: boolean;
  onChange?: () => void;
  onSubmit?: () => void;
}

const TextField = ({
  value,
  label,
  onChange,
  onSubmit,
  disabled = false,
}: TextFieldProps) => {
  return (
    <div className={cx('container')}>
      {label && <span className={cx('label')}>{label}</span>}
      <input
        type="text"
        value={value}
        className={cx('input')}
        onChange={onChange}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </div>
  );
};

export default TextField;
