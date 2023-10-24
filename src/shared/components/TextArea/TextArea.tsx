import classNames from 'classnames/bind';
import {
  forwardRef,
  type DetailedHTMLProps,
  type ForwardedRef,
  type TextareaHTMLAttributes,
} from 'react';

import styles from './TextArea.module.scss';

const cx = classNames.bind(styles);

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
};

const TextArea = forwardRef(
  (
    { label, className, ...props }: TextAreaProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={cx('container', className)}>
        {label && <label className={cx('label')}>{label}</label>}
        <textarea className={cx('text-area')} {...props} />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
