import { useContext } from 'react';

import { confirmResolveCallback } from '@/shared/hooks/useConfirm';
import { ConfirmContext } from '@/shared/stores/ConfirmContext';

import ConfirmModal from '../ConfirmModal';

export const GlobalConfirmModal = () => {
  const [confirmState, dispatch] = useContext(ConfirmContext);

  const closeConfirm = () => {
    dispatch({
      type: 'CLOSE',
    });
  };

  const onOk = async () => {
    await confirmState.onOk?.();
    closeConfirm();
    confirmResolveCallback(true);
  };

  const onCancel = async () => {
    await confirmState.onCancel?.();
    closeConfirm();
    confirmResolveCallback(false);
  };

  return (
    <ConfirmModal
      {...confirmState}
      onClose={closeConfirm}
      onOk={onOk}
      onCancel={onCancel}
    />
  );
};
