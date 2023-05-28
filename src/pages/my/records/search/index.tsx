import classNames from 'classnames/bind';
import { useState } from 'react';

import RecentSearches from '@/features/search/components/RecentSearches';
import SearchBar from '@/features/search/components/SearchBar';
import { useSearchMyRecords } from '@/shared/apis/records/searchMyRecords';
import BottomNavigator from '@/shared/components/BottomNavigator';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';
const cx = classNames.bind(styles);

const sampleItems = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  name: `Sample Item ${index + 1}`,
}));

const MyRecordSearch = () => {
  const [keyword, setKeyword] = useState('');
  const { data } = useSearchMyRecords({
    variables: { keyword },
    enabled: !!keyword,
  });
  const myRecords = data?.pages.flatMap((page) => page.recordMetaList);

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
    <PageLayout className={cx('main')} hasBottomNavigatorPadding>
      <TopNavigator title={'나의 술로그'} highlighted>
        <div className={cx('search-bar-wrapper')}>
          <SearchBar
            placeholder={'Search'}
            value={keyword}
            onChange={setKeyword}
            useDebounce
          />
        </div>
      </TopNavigator>
      <RecentSearches
        items={sampleItems}
        onDeleteItem={onDeleteItem}
        onClickItem={onClickItem}
        onDeleteAll={onDeleteAll}
      />
      {/* TODO: 기록 검색 후 UI 추가 */}
      <BottomNavigator />
    </PageLayout>
  );
};

export default MyRecordSearch;
