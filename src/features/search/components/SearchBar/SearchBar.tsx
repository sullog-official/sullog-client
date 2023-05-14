import classNames from 'classnames/bind';
import { debounce } from 'lodash-es';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Icon from '@/shared/components/Icon';

import ChipContainer from './ChipContainer';
import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

type SearchBarProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  filterItems?: string[];
  selectedFilter?: string[];
  onFilterClick?: (filter: string) => void;
  useDebounce?: boolean;
};

const SearchBar = ({
  placeholder,
  value: outerValue,
  onChange,
  useDebounce = false,
  onKeyDown,
  filterItems,
  selectedFilter,
  onFilterClick,
}: SearchBarProps) => {
  const [value, setValue] = useState(outerValue);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const handleFilterClick = () => setIsFilterOpen(!isFilterOpen);

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

  const filterIconColor = isFilterOpen ? 'purple' : 'grey300';

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
        {filterItems && (
          <button
            type="button"
            className={cx('filter-btn')}
            onClick={handleFilterClick}
          >
            <Icon name="Filter" size={9} color={filterIconColor} />
          </button>
        )}
      </div>
      {filterItems && isFilterOpen && (
        <ChipContainer
          items={filterItems}
          selectedItems={selectedFilter}
          onClick={onFilterClick}
        />
      )}
    </>
  );
};

export default SearchBar;
