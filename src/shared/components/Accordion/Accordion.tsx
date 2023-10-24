import classNames from 'classnames/bind';
import type { ReactNode } from 'react';

import Icon from '@/shared/components/Icon';
import { useOpen } from '@/shared/hooks/useOpen';

import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

type AccordionProps = {
  header: string;
  children?: ReactNode;
  maxHeight?: number;
};

const DEFAULT_MAX_HEIGHT = 150;

const Accordion = ({
  header,
  children,
  maxHeight = DEFAULT_MAX_HEIGHT,
}: AccordionProps) => {
  const [isOpen, open, close] = useOpen();

  return (
    <div className={cx('accordion')}>
      <button
        className={cx('header')}
        type="button"
        onClick={isOpen ? close : open}
        aria-expanded={isOpen}
      >
        <span className={cx('header-text')}>{header}</span>
        <Icon
          aria-label={isOpen ? '접기' : '펼치기'}
          className={cx('icon', { 'icon--rotated': isOpen })}
          name={'Plus'}
          size={10}
        />
      </button>
      <div
        className={cx('contents', { 'contents--is-open': isOpen })}
        aria-hidden={!isOpen}
        style={{ '--max-height': `${maxHeight}px` } as React.CSSProperties}
      >
        <div className={cx('inner-contents')}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
