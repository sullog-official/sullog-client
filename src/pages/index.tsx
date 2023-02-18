import classNames from 'classnames/bind';

import Map from '@/features/home/components/Map';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <main className={cx('main')}>
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
    </main>
  );
}
