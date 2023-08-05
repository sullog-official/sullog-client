import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';

import { useMyRecentSearchKeywords } from '../../hooks/useMyRecentSearchKeywords';
import MyRecordSearchResult from '../MyRecordSearchResult';
import RecentSearches from '../RecentSearches';
import SearchBar from '../SearchBar';

import styles from './MyRecordSearchModal.module.scss';

const cx = classNames.bind(styles);

type MyRecordSearchModalProps = {
  onClose: VoidFunction;
};

const MyRecordSearchModal = ({ onClose }: MyRecordSearchModalProps) => {
  const { myRecentSearchKeywords, saveKeyword, deleteKeyword, resetKeywords } =
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
    <PageLayout
      className={cx('my-record-search-modal')}
      hasBottomNavigatorPadding
      isModal
    >
      <TopNavigator title={'나의 술로그'} highlighted onBack={onClose}>
        <div className={cx('search-bar-wrapper')}>
          <SearchBar
            placeholder="술이름을 검색해보세요"
            value={keyword}
            onValueChange={setKeyword}
            useDebounce
          />
        </div>
      </TopNavigator>
      {isSearched && keyword ? (
        <MyRecordSearchResult
          keyword={keyword}
          onClickAlcoholPreview={saveKeyword}
        />
      ) : (
        <RecentSearches
          items={myRecentSearchKeywords}
          onDeleteItem={deleteKeyword}
          onClickItem={onClickKeyword}
          onReset={resetKeywords}
        />
      )}
    </PageLayout>
  );
};

export default MyRecordSearchModal;
