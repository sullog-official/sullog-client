import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import DrawerContents from '@/features/home/components/DrawerContents';
import Map from '@/features/home/components/Map';
import SearchBar from '@/features/search/components/SearchBar';
import { useGetMyRecord } from '@/shared/apis/records/getMyRecord';
import { useGetStatistics } from '@/shared/apis/records/getStatistics';
import BottomNavigator from '@/shared/components/BottomNavigator';
import Drawer from '@/shared/components/Drawer';
import PageLayout from '@/shared/components/PageLayout';
import { useModal } from '@/shared/hooks/useModal';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const { data: records = [] } = useGetMyRecord();
  const { data: statistics } = useGetStatistics();

  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const [isDrawerOpen, openDrawer, closeDrawer] = useModal();

  const filteredRecords = records.filter((record) =>
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
    <PageLayout>
      <div className={cx('header')}>
        <h1 className={cx('header-text')} style={mapoFlowerIsland.style}>
          나의 술로그
        </h1>
        <SearchBar
          placeholder="Search"
          value={searchValue}
          onChange={setSearchValue}
          filterItems={['소주', '과실주', '막걸리', '기타', '전체']}
          selectedFilter={selectedFilter}
          onFilterClick={handleFilterClick}
        />
      </div>
      <Map records={selectedFilter.length > 0 ? filteredRecords : records} />
      <BottomNavigator openDrawer={openDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <DrawerContents statistics={statistics} />
      </Drawer>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGetStatistics.getKey(),
    useGetStatistics.queryFn
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
