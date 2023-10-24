import type { ReactNode } from 'react';

import {
  ConfirmContext,
  useConfirmReducer,
} from '@/shared/stores/ConfirmContext';

import { GlobalConfirmModal } from './GlobalConfirmModal';

type ConfirmProviderProps = {
  children: ReactNode;
};

const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [state, dispatch] = useConfirmReducer();

  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {children}
      <GlobalConfirmModal />
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
