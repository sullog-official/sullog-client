import classNames from 'classnames/bind';
import { useState } from 'react';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Map from '@/features/home/components/Map';
import SearchBar from '@/features/search/components/SearchBar';
import BottomNavigator from '@/shared/components/BottomNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

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
        records={[
          {
            recordId: 1,
            description: 'This is a first sample record.',
            mainPhotoPath: 'path/to/photo1.jpg',
            alcoholId: 1,
            alcoholName: 'test1',
            productionLocation: '서울시 광진구 능동로 120',
            productionLatitude: 37.123456,
            productionLongitude: 126.789012,
            alcoholTag: 'SOJU',
            brandName: '진로',
          },
          {
            recordId: 2,
            description: 'This is a second sample record.',
            mainPhotoPath: 'path/to/photo3.jpg',
            alcoholId: 2,
            alcoholName: 'test2',
            productionLocation: '서울시 광진구 능동로 120',
            productionLatitude: 36.987654,
            productionLongitude: 127.012345,
            alcoholTag: 'FRUIT_WINE',
            brandName: '진로',
          },
          {
            recordId: 3,
            description: 'This is a third sample record.',
            mainPhotoPath: 'path/to/photo5.jpg',
            alcoholId: 3,
            alcoholName: 'test3',
            productionLocation: '서울시 광진구 능동로 120',
            productionLatitude: 35.123456,
            productionLongitude: 128.789012,
            alcoholTag: 'MAKGEOLLI',
            brandName: '진로',
          },
        ]}
      />
      <BottomNavigator />
    </main>
  );
}
