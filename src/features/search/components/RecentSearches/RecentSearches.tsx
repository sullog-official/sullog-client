import classNames from 'classnames/bind';

import Icon from '@/shared/components/Icon';

import styles from './RecentSearches.module.scss';

const cx = classNames.bind(styles);

type RecentSearchesProps = {
  items?: string[];
  onDeleteItem: (item: string) => void;
  onClickItem: (item: string) => void;
  onReset: () => void;
};

const RecentSearches = ({
  items = [],
  onDeleteItem,
  onClickItem,
  onReset,
}: RecentSearchesProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <span className={cx('title')}>최근 검색어</span>
        <span className={cx('subtitle')} onClick={onReset}>
          모두 지우기
        </span>
      </div>
      <ul className={cx('items')}>
        {items.map((item, index) => {
          return (
            <li className={cx('item')} key={`${item}-${index}`}>
              <span
                className={cx('item-name')}
                onClick={() => onClickItem(item)}
              >
                {item}
              </span>
              <button
                type="button"
                aria-label="삭제"
                className={cx('item-delete')}
                onClick={() => onDeleteItem(item)}
              >
                <Icon name={'Close'} size={7} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentSearches;
