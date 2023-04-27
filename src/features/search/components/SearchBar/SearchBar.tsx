import classNames from 'classnames/bind';
import { ChangeEventHandler, useState } from 'react';

import Icon from '@/shared/components/Icon';

import ChipContainer from './ChipContainer';
import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

type SearchBarProps = {
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  filterItems?: string[];
  selectedFilter?: string[];
  onFilterClick?: (filter: string) => void;
};

const SearchBar = ({
  placeholder,
  value,
  onChange,
  filterItems,
  selectedFilter,
  onFilterClick,
}: SearchBarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => setIsFilterOpen(!isFilterOpen);

  const filterIconColor = isFilterOpen ? 'purple' : 'grey300';

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('search-box')}>
          <Icon name={'Search'} size={12} />
          <input
            className={cx('search-input')}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
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
