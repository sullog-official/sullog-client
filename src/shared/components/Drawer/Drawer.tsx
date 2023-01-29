import classNames from 'classnames/bind';
import React from 'react';

import styles from './Drawer.module.scss';

const cx = classNames.bind(styles);

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => {};
  width?: number;
  position?: 'left' | 'right';
}

const Drawer = ({
  children,
  isOpen,
  onClose,
  width = 30,
  position = 'left',
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
        style={{ width: `${width}%` }}
        role="dialog"
      >
        {children}
      </div>
      <div className="backdrop" onClick={onClose} />
    </div>
  );
};

export default Drawer;
