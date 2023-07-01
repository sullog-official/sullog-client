import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import Button from '../Button';
import ModalLayout from '../ModalLayout';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  /** 제목 */
  title?: string;
  /** 내용 */
  content?: ReactNode;
  /** 확인 버튼 문구 (default: '확인') */
  okText?: string;
  onOk?: VoidFunction;
  /** 취소 버튼 문구 (default: '취소') */
  cancelText?: string;
  onCancel?: VoidFunction;
  /** 취소 버튼 숨김 여부 */
  hideCancelButton?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  content,
  okText = '확인',
  onOk,
  cancelText = '취소',
  onCancel,
  hideCancelButton,
}: ModalProps) => {
  const handleCancelClick = () => {
    onCancel?.();
    onClose();
  };

  const handleOkClick = () => {
    onOk?.();
    onClose();
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <article className={cx('modal', { open: isOpen })}>
        <div className={cx('title')}>{title && <h1>{title}</h1>}</div>
        <div className={cx('content')}>{content}</div>
        <div className={cx('button-group')}>
          {!hideCancelButton && (
            <Button type="outline" onClick={handleCancelClick}>
              {cancelText}
            </Button>
          )}
          <Button type="primary" onClick={handleOkClick}>
            {okText}
          </Button>
        </div>
      </article>
    </ModalLayout>
  );
};

export default Modal;
