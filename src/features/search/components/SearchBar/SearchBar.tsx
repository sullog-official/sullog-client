import classNames from 'classnames/bind';
import { ChangeEventHandler, MouseEvent, useState } from 'react';

import { Button } from '@/shared/components';
import Icon from '@/shared/components/Icon';

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

type ChipContainerProps = {
  items: string[];
  selectedItems?: string[];
  onClick?: (filter: string) => void;
};

const ChipContainer = ({
  items,
  selectedItems,
  onClick,
}: ChipContainerProps) => {
  const handleChipClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const item = (e.target as HTMLElement).innerText;
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <div className={cx('chip-container')}>
      {items.map((item: string) => (
        <Button
          key={item}
          type={selectedItems?.includes(item) ? 'primary' : 'outline'}
          buttonType="button"
          onClick={handleChipClick}
          className={cx('chip-btn')}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};
