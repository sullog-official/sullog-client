import classNames from 'classnames/bind';
import React from 'react';

import styles from './Drawer.module.scss';

const cx = classNames.bind(styles);

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
  return (
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      className={cx('container', {
        open: isOpen,
      })}
    >
      <div
        className={cx('drawer', position)}
        style={{ width: `${percentage}%` }}
        role="dialog"
      >
        {children}
      </div>
      <div className={cx('backdrop')} onClick={onClose} />
    </div>
  );
};

export default Drawer;
