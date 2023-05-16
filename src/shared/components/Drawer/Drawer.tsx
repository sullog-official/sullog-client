import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';

import Icon from '../Icon';

import styles from './Drawer.module.scss';

const cx = classNames.bind(styles);

const TRANSITION_SPEED = 300;

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  percentage?: number;
  position?: 'left' | 'right';
}

const Drawer = ({
  children,
  isOpen,
  onClose,
  percentage = 83,
  position = 'right',
}: DrawerProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  useEffect(() => {
    let timer: number;

    if (isOpen) {
      setIsVisible(true);
    } else {
      timer = window.setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      className={cx('container', { open: isOpen })}
    >
      <div
        className={cx('drawer', position, { open: isOpen })}
        style={{ width: `${percentage}%` }}
        role="dialog"
      >
        <button
          className={cx('close-btn')}
          type="button"
          aria-label="메뉴 닫기"
          onClick={onClose}
        >
          <Icon name="Close" size={16} />
        </button>
        {children}
      </div>
      <div className={cx('backdrop')} onClick={onClose} />
    </div>
  );
};

export default Drawer;
