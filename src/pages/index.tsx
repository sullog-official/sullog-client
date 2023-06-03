import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Map from '@/features/home/components/Map';
import AlcoholCategoryFilter from '@/features/search/components/AlcoholCategoryFilter';
import SearchBar from '@/features/search/components/SearchBar';
import { useGetMyRecords } from '@/shared/apis/records/getMyRecords';
import { useGetStatistics } from '@/shared/apis/records/getStatistics';
import BottomNavigator from '@/shared/components/BottomNavigator';
import Icon from '@/shared/components/Icon';
import PageLayout from '@/shared/components/PageLayout';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const { data: records = [] } = useGetMyRecords();
  const { data: statistics } = useGetStatistics();

  const [searchValue, setSearchValue] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const filteredRecords = useMemo(
    () =>
      !selectedFilter.length
        ? records
        : records.filter((record) =>
            selectedFilter.includes(record.alcoholTag)
          ),
    [records, selectedFilter]
  );

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <PageLayout>
      <div className={cx('header')}>
        <h1 className={cx('header-text')} style={mapoFlowerIsland.style}>
          나의 술로그
        </h1>
        <SearchBar
          placeholder="Search"
          value={searchValue}
          onChange={setSearchValue}
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
        {showFilter && (
          <AlcoholCategoryFilter
            selectedCategories={selectedFilter}
            onChange={setSelectedFilter}
          />
        )}
      </div>
      <Map records={filteredRecords} />
      <BottomNavigator statistics={statistics} />
    </PageLayout>
  );
}
