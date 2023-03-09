import classNames from 'classnames/bind';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

import styles from './TextArea.module.scss';

const cx = classNames.bind(styles);

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
};

const TextArea = ({ label, className, ...props }: TextAreaProps) => {
  return (
    <div className={cx('container', className)}>
      {label && <label className={cx('label')}>{label}</label>}
      <textarea className={cx('text-area')} {...props} />
    </div>
  );
};

export default TextArea;
