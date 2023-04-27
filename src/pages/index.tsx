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
          // @ts-ignore
          {
            name: '술1',
            seq: 123,
            type: '소주',
            manufacturer: '제조사',
            lat: '127.07015',
            lng: '37.54607',
            etc: '설명ㅁ나ㅜㅠㅜㅏㅓㅁㄴㅇ',
          },
          // @ts-ignore
          {
            name: '술2',
            seq: 1234,
            type: '소주2',
            manufacturer: '제조사22',
            lat: '127.07019',
            lng: '37.54608',
            etc: '설명ㅁ나ㅜㅠㅜㅏㅓㅁㄴㅇ',
          },
        ]}
      />
      <BottomNavigator />
    </main>
  );
}
