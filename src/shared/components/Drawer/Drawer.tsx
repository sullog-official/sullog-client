import classNames from 'classnames/bind';
import React from 'react';

import Icon from '../Icon';
import ModalLayout from '../ModalLayout';

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
    <ModalLayout isOpen={isOpen} onClose={onClose}>
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
    </ModalLayout>
  );
};

export default Drawer;
