import classNames from 'classnames/bind';
import { useState } from 'react';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Map from '@/features/home/components/Map';
import SearchBar from '@/features/search/components/SearchBar';
import { useGetMyRecord } from '@/shared/apis/records/getMyRecord';
import BottomNavigator from '@/shared/components/BottomNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const { data: records } = useGetMyRecord();
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const filteredRecords = (records || []).filter((record) =>
    selectedFilter.includes(record.alcoholTag)
  );

  const handleFilterClick = (filter: string) => {
    if (selectedFilter.includes(filter)) {
      return setSelectedFilter(
        selectedFilter.filter((item) => item !== filter)
      );
    }
    setSelectedFilter([...selectedFilter, filter]);
  };

  return (
    <main className={cx('main')}>
      <div className={cx('header')}>
        <h1 className={cx('header-text')} style={mapoFlowerIsland.style}>
          나의 술로그
        </h1>
        <SearchBar
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          filterItems={['소주', '과실주', '막걸리', '기타', '전체']}
          selectedFilter={selectedFilter}
          onFilterClick={handleFilterClick}
        />
      </div>
      <Map
        records={selectedFilter.length > 0 ? filteredRecords : records || []}
      />
      <BottomNavigator />
    </main>
  );
}
