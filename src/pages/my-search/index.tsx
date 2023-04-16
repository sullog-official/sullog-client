import classNames from 'classnames/bind';

import RecentSearches from '@/features/search/components/RecentSearches';
import SearchBar from '@/features/search/components/SearchBar';
import BottomNavigator from '@/shared/components/BottomNavigator';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';
const cx = classNames.bind(styles);

const sampleItems = [
  {
    id: 1,
    name: 'Sample Item 1',
  },
  {
    id: 2,
    name: 'Sample Item 2',
  },
];

const MySearch = () => {
  const onDeleteItem = () => {
    // Do something
  };

  const onClickItem = () => {
    // Do something
  };

  const onDeleteAll = () => {
    // Do something
  };

  return (
    <>
      <TopNavigator title={'나의 술로그'} highlighted />
      <main className={cx('wrapper')}>
        <div className={cx('search-bar-wrapper')}>
          <SearchBar placeholder={'Search'} />
        </div>
        <div className={cx('recent-searches-wrapper')}>
          <RecentSearches
            items={sampleItems}
            onDeleteItem={onDeleteItem}
            onClickItem={onClickItem}
            onDeleteAll={onDeleteAll}
          />
        </div>
      </main>
      <BottomNavigator />
    </>
  );
};

export default MySearch;
