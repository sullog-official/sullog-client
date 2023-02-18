import classNames from 'classnames/bind';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

import styles from './TextArea.module.scss';

const cx = classNames.bind(styles);

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const TextArea = ({ className, ...props }: TextAreaProps) => {
  return <textarea className={cx('text-area', className)} {...props} />;
};

export default TextArea;
