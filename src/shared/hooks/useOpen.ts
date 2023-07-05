import { useCallback, useState } from 'react';

export const useOpen = (
  defaultOpen: boolean = false
): [boolean, VoidFunction, VoidFunction] => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, open, close];
};
