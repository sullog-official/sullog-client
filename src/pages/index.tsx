import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
import { MouseEvent, useMemo, useState } from 'react';

import Map from '@/features/home/components/Map';
import AlcoholCategoryFilter from '@/features/search/components/AlcoholCategoryFilter';
import SearchBar from '@/features/search/components/SearchBar';
import { useGetMyRecords } from '@/shared/apis/records/getMyRecords';
import { useGetStatistics } from '@/shared/apis/records/getStatistics';
import BottomNavigator from '@/shared/components/BottomNavigator';
import Icon from '@/shared/components/Icon';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';
import { useModal } from '@/shared/hooks/useModal';
import { alcoholTag } from '@/shared/types/alcohol';

import styles from './index.module.scss';

const MyRecordSearchModal = dynamic(
  () => import('@/features/search/components/MyRecordSearchModal')
);

const cx = classNames.bind(styles);

export default function Home() {
  const { data: records = [] } = useGetMyRecords();
  const { data: statistics } = useGetStatistics();

  const [
    showMyRecordSearchModal,
    openMyRecordSearchModal,
    closeMyRecordSearchModal,
  ] = useModal();

  const [showFilter, setShowFilter] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['전체']);

  const filteredRecords = useMemo(
    () =>
      selectedFilters.includes('전체')
        ? records
        : !selectedFilters.length
        ? records
        : records.filter((record) =>
            selectedFilters.includes(alcoholTag[record.alcoholTag])
          ),
    [records, selectedFilters]
  );

  const toggleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowFilter(!showFilter);
  };

  return (
    <PageLayout>
      <TopNavigator
        title={'나의 술로그'}
        highlighted
        backgroundColor="transparent"
        showBackButton={false}
      >
        <div className={cx('search-bar-wrapper')}>
          <SearchBar
            readOnly
            placeholder="술이름을 검색해보세요"
            onClick={openMyRecordSearchModal}
            extras={
              <button
                className={cx('filter-button')}
                type="button"
                onClick={toggleFilter}
                aria-label="필터"
              >
                <Icon
                  name="Filter"
                  size={9}
                  color={showFilter ? 'purple' : 'grey300'}
                />
              </button>
            }
          />
        </div>
        {showFilter && (
          <div className={cx('category-filter-wrap')}>
            <AlcoholCategoryFilter
              selectedCategories={selectedFilters}
              onChange={setSelectedFilters}
            />
          </div>
        )}
      </TopNavigator>
      <Map records={filteredRecords} />
      {showMyRecordSearchModal && (
        <MyRecordSearchModal onClose={closeMyRecordSearchModal} />
      )}
      <BottomNavigator statistics={statistics} />
    </PageLayout>
  );
}
