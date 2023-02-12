import Icon from '@/shared/components/Icon';

import classNames from 'classnames/bind';

import styles from './RecentSearches.module.scss';

const cx = classNames.bind(styles);

type RecentSearchItem = {
  id: number;
  name: string;
};

type RecentSearchesProps = {
  items: RecentSearchItem[];
  onDeleteItem: (id: number) => void;
  onClickItem: (id: number) => void;
  onDeleteAll: () => void;
};

const RecentSearches = ({
  items,
  onDeleteItem,
  onClickItem,
  onDeleteAll,
}: RecentSearchesProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <span className={cx('title')}>최근 검색어</span>
        <span className={cx('subtitle')} onClick={onDeleteAll}>
          모두 지우기
        </span>
      </div>
      <ul className={cx('items')}>
        {items.map((item) => {
          return (
            <li
              className={cx('item')}
              onClick={() => onClickItem(item.id)}
              key={item.id}
            >
              <span className={cx('item-name')}>{item.name}</span>
              <div
                className={cx('item-delete')}
                onClick={() => onDeleteItem(item.id)}
              >
                <Icon name={'Close'} size={7} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentSearches;
