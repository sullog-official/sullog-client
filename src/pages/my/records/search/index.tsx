import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import MyRecordSearchResult from '@/features/search/components/MyRecordSearchResult';
import RecentSearches from '@/features/search/components/RecentSearches';
import SearchBar from '@/features/search/components/SearchBar';
import { useMyRecentSearchKeywords } from '@/features/search/hooks/useMyRecentSearchKeywords';
import BottomNavigator from '@/shared/components/BottomNavigator';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';
const cx = classNames.bind(styles);

// TODO: 페이지 -> 플로팅 레이아웃으로 변경
const MyRecordSearch = () => {
  const { myRecentSearchKeywords, deleteKeyword, resetKeywords } =
    useMyRecentSearchKeywords();

  const [isSearched, setIsSearched] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (!isSearched && !!keyword) {
      setIsSearched(true);
    }
  }, [isSearched, keyword]);

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
            onValueChange={setKeyword}
            useDebounce
          />
        </div>
      </TopNavigator>
      {isSearched ? (
        <MyRecordSearchResult keyword={keyword} />
      ) : (
        <RecentSearches
          items={myRecentSearchKeywords}
          onDeleteItem={deleteKeyword}
          onClickItem={onClickKeyword}
          onReset={resetKeywords}
        />
      )}
      <BottomNavigator />
    </PageLayout>
  );
};

export default MyRecordSearch;
