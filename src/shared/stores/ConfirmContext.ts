import { createContext, useContext, useReducer, type Dispatch } from 'react';

import type { ConfirmModalProps } from '../components/ConfirmModal/ConfirmModal';

export type ConfirmState = Omit<ConfirmModalProps, 'onClose'>;

export type ConfirmOpenPayload = Omit<ConfirmModalProps, 'isOpen' | 'onClose'>;

export type ConfirmAction =
  | {
      type: 'OPEN';
      payload?: ConfirmOpenPayload;
    }
  | {
      type: 'CLOSE';
    };

const initialConfirmState: ConfirmState = {
  isOpen: false,
  message: '',
};

const confirmReducer = (
  state: ConfirmState,
  action: ConfirmAction
): ConfirmState => {
  switch (action.type) {
    case 'OPEN':
      return {
        /** 새로운 모달을 띄울때 이전 상태를 보존하면 안됨  */
        ...initialConfirmState,
        ...action.payload,
        isOpen: true,
      };
    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return initialConfirmState;
  }
};

export const useConfirmReducer = () => {
  return useReducer(confirmReducer, initialConfirmState);
};

export const ConfirmContext = createContext<
  [ConfirmState, Dispatch<ConfirmAction>]
>([initialConfirmState, () => null]);

export const useConfirmContext = () => {
  return useContext(ConfirmContext);
};
