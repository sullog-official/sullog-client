import classNames from 'classnames/bind';
import { debounce } from 'lodash-es';
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Icon from '@/shared/components/Icon';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

type SearchBarProps = {
  placeholder: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClick?: VoidFunction;
  readOnly?: boolean;
  extras?: React.ReactNode;
  useDebounce?: boolean;
};

const SearchBar = ({
  placeholder,
  value: outerValue = '',
  onValueChange,
  onKeyDown,
  onClick,
  readOnly,
  extras,
  useDebounce = false,
}: SearchBarProps) => {
  const [value, setValue] = useState(outerValue);

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const debouncedChange = useMemo(
    () => onValueChange && debounce(onValueChange, 300),
    [onValueChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      (useDebounce ? debouncedChange : onValueChange)?.(e.target.value);
    },
    [debouncedChange, onValueChange, useDebounce]
  );

  return (
    <>
      <div
        className={cx('wrapper')}
        onClick={onClick}
        {...(readOnly && {
          role: 'button',
        })}
      >
        <Icon name={'Search'} size={12} />
        <input
          autoFocus={true}
          className={cx('search-input')}
          readOnly={readOnly}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
        {extras && extras}
      </div>
    </>
  );
};

export default SearchBar;
