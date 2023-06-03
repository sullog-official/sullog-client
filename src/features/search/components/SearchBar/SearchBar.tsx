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
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  extras?: React.ReactNode;
  useDebounce?: boolean;
};

const SearchBar = ({
  placeholder,
  value: outerValue,
  onChange,
  useDebounce = false,
  onKeyDown,
  extras,
}: SearchBarProps) => {
  const [value, setValue] = useState(outerValue);

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const debouncedChange = useMemo(
    () => onChange && debounce(onChange, 300),
    [onChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      (useDebounce ? debouncedChange : onChange)?.(e.target.value);
    },
    [debouncedChange, onChange, useDebounce]
  );

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('search-box')}>
          <Icon name={'Search'} size={12} />
          <input
            className={cx('search-input')}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </div>
        {extras && extras}
      </div>
    </>
  );
};

export default SearchBar;
