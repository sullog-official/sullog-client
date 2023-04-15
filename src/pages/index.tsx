import classNames from 'classnames/bind';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import Map from '@/features/home/components/Map';
import SearchBar from '@/features/search/SearchBar';
import BottomNavigator from '@/shared/components/BottomNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <main className={cx('main')}>
      <div className={cx('header')}>
        <h1 className={cx('header-text')} style={mapoFlowerIsland.style}>
          나의 술로그
        </h1>
        <SearchBar placeholder={'Search'} />
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
