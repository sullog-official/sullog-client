import classNames from 'classnames/bind';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useOpen } from '@/shared/hooks/useOpen';

import styles from './ModalLayout.module.scss';

const cx = classNames.bind(styles);

type ModalLayoutProps = {
  isOpen: boolean;
  children?: ReactNode;
  onClose?: VoidFunction;
};

const ModalLayout = ({ isOpen, children, onClose }: ModalLayoutProps) => {
  const { dimRef, isVisible } = useModalLayoutVisible(isOpen);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div className={cx('container', { open: isOpen })}>
      <div
        className={cx('dim', { open: isOpen })}
        ref={dimRef}
        onClick={onClose}
      />
      {children}
    </div>,
    document.body
  );
};

export default ModalLayout;

const useModalLayoutVisible = (isOpen: boolean) => {
  const dimRef = useRef<HTMLDivElement>(null);
  const [isVisible, show, hide] = useOpen(isOpen);

  useEffect(() => {
    if (isOpen) {
      show();
    } else {
      let divRefValue: HTMLDivElement | null = dimRef.current;
      divRefValue?.addEventListener('animationend', hide);
      return () => divRefValue?.removeEventListener('animationend', hide);
    }
  }, [dimRef, isOpen, show, hide]);

  return { dimRef, isVisible };
};
