import classNames from 'classnames/bind';
import { MouseEvent } from 'react';

import { Button } from '@/shared/components';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

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

export default ChipContainer;
