import classNames from 'classnames/bind';
import Link from 'next/link';

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

  const renderExtraButton = () => {
    return (
      <div className={cx('extra-btn')}>
        <Link href="/records/create">다음</Link>
      </div>
    );
  };

  return (
    <>
      <TopNavigator title={'검색'} extra={renderExtraButton} />
      <main className={cx('wrapper')}>
        <div className={cx('search-bar-wrapper')}>
          <SearchBar placeholder={'마신 술 이름을 검색해주세요.'} />
        </div>
      </main>
    </>
  );
};

export default MySearch;
