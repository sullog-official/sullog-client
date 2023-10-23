import {
  useConfirmContext,
  type ConfirmOpenPayload,
} from '../stores/ConfirmContext';

export let confirmResolveCallback: (value: boolean) => void;

const useConfirm = () => {
  const [, dispatch] = useConfirmContext();

  const confirm = (payload: ConfirmOpenPayload) => {
    dispatch({
      type: 'OPEN',
      payload,
    });

    return new Promise((resolve) => {
      confirmResolveCallback = resolve;
    });
  };

  return { confirm };
};

export default useConfirm;
