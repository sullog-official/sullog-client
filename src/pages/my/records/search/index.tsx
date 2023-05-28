import classNames from 'classnames/bind';
import { useState } from 'react';

import RecentSearches from '@/features/search/components/RecentSearches';
import SearchBar from '@/features/search/components/SearchBar';
import { useMyRecentSearchKeywords } from '@/features/search/hooks/useMyRecentSearchKeywords';
import { useSearchMyRecords } from '@/shared/apis/records/searchMyRecords';
import BottomNavigator from '@/shared/components/BottomNavigator';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';
const cx = classNames.bind(styles);

const MyRecordSearch = () => {
  const [keyword, setKeyword] = useState('');

  const { myRecentSearchKeywords, deleteKeyword, resetKeywords } =
    useMyRecentSearchKeywords();

  const { data: searchMyRecordsInfiniteData } = useSearchMyRecords({
    variables: { keyword },
    enabled: !!keyword,
  });
  const myRecords = searchMyRecordsInfiniteData?.pages.flatMap(
    (page) => page.recordMetaList
  );

  const onClickKeyword = (item: string) => {
    setKeyword(item);
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
        items={myRecentSearchKeywords}
        onDeleteItem={deleteKeyword}
        onClickItem={onClickKeyword}
        onReset={resetKeywords}
      />
      {/* TODO: 기록 검색 후 UI 추가 */}
      <BottomNavigator />
    </PageLayout>
  );
};

export default MyRecordSearch;
