import classNames from 'classnames/bind';

import Modal from '../Modal';

import styles from './ConfirmModal.module.scss';

const cx = classNames.bind(styles);

export type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  /** 메시지 */
  message: string;
  /** 설명 */
  description?: string;
  /** 확인 버튼 문구 (default: '확인') */
  okText?: string;
  onOk?: VoidFunction;
  /** 취소 버튼 문구 (default: '취소') */
  cancelText?: string;
  onCancel?: VoidFunction;
  /** 취소 버튼 숨김 여부 */
  hideCancelButton?: boolean;
};

const ConfirmModal = ({
  message,
  description,
  ...modalProps
}: ConfirmModalProps) => {
  return (
    <Modal
      {...modalProps}
      content={
        <div className={cx('content')}>
          <p className={cx('message')}>{message}</p>
          {description && <p className={cx('description')}>{description}</p>}
        </div>
      }
    />
  );
};

export default ConfirmModal;
