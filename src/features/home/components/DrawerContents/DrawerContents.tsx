import classNames from 'classnames/bind';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import DonutChart from '@/features/home/components/DonutChart';
import logout from '@/shared/apis/auth/logout';
import { Button } from '@/shared/components';
import { Statistics } from '@/shared/types/record/statistics';

import styles from './DrawerContents.module.scss';

const cx = classNames.bind(styles);

type DrawerContentsProps = {
  statistics: Statistics;
};

const DrawerContents = ({ statistics }: DrawerContentsProps) => {
  const recordsCount = Object?.values(statistics?.recordStatisticsMap).reduce(
    (acc, cur) => acc + cur,
    0
  );

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title-box')}>
        <p>
          <span className={cx('name')}>{statistics?.nickname}</span>님 환영해요!
        </p>
        <p>오늘도 나만의 술로그를 남겨보아요</p>
      </div>
      <div className={cx('chart-container')}>
        <p style={mapoFlowerIsland.style}>나의 술로그</p>
        {/*<div className={cx('chart-box')}>*/}
        <DonutChart
          width={200}
          height={200}
          items={[
            { value: 100, color: 'red' },
            { value: 200, color: 'green' },
            { value: 300, color: 'blue' },
            { value: 150, color: 'purple' },
          ]}
          innerRadius={'50%'}
          outerRadius={'25%'}
        />
        {/*</div>*/}
        <p>
          {statistics?.nickname}님은 {recordsCount}개의 술로그를 남겨주었어요
        </p>
      </div>
      <div className={cx('button-container')}>
        <Button>문의하기</Button>
        <Button type="outline" onClick={logout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default DrawerContents;
