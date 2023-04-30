import classNames from 'classnames/bind';

import Card from '@/features/feed/components/Card';
import BottomNavigator from '@/shared/components/BottomNavigator';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Feed = () => {
  return (
    <>
      <TopNavigator title={'이웃 술로그'} highlighted />
      <main className={cx('wrapper')}>
        {/*TODO: 실제 데이터로 바뀔 부분*/}
        {mockData.map((data, idx) => (
          <Card key={idx} />
        ))}
      </main>
      <BottomNavigator />
    </>
  );
};

const mockData = Array.from({ length: 8 });

export default Feed;
