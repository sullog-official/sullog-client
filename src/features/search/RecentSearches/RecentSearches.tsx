import classNames from 'classnames/bind';
import Icon from '@/shared/components/Icon';

import styles from './RecentSearches.module.scss';

const cx = classNames.bind(styles);

type RecentSearchItem = {
  id: number;
};

type RecentSearchesProps = {
  items: RecentSearchItem[];
  onDeleteItem: () => void;
  onClickItem: () => void;
  onClickDeleteAll: () => void;
};

const RecentSearches = ({
  items,
  onDeleteItem,
  onClickItem,
  onClickDeleteAll,
}: RecentSearchesProps) => {
  return (
    <div>
      <div className={cx('header')}>
        <span className={cx('title')}>최근 검색어</span>
        <span className={cx('subtitle')}>모두 지우기</span>
      </div>
      <ul className={cx('items')}>
        <li className={cx('item')}>
          <span className={cx('item-name')}>맛있는 술</span>
          <div className={cx('item-delete')}>
            <Icon name={'Close'} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RecentSearches;
