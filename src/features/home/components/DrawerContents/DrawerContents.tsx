import classNames from 'classnames/bind';
import Link from 'next/link';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import DoughnutChart from '@/features/home/components/DoughnutChart';
import { Button } from '@/shared/components';
import useAuth from '@/shared/hooks/useAuth';
import { Statistics } from '@/shared/types/record/statistics';

import styles from './DrawerContents.module.scss';

const cx = classNames.bind(styles);

type DrawerContentsProps = {
  statistics: Statistics;
};

const DrawerContents = ({ statistics }: DrawerContentsProps) => {
  const { logout } = useAuth();

  const recordsCount = Object?.values(statistics?.recordStatisticsMap).reduce(
    (acc, cur) => acc + cur,
    0
  );

  const onClickContact = () => {
    window.location.href = 'mailto:gino9940@gmail.com';
  };

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
        <DoughnutChart statistics={statistics} />
        {recordsCount ? (
          <p>
            {statistics?.nickname}님은 {recordsCount}개의 술로그를 남겨주었어요
          </p>
        ) : (
          <div>
            <span>아직 술로그를 작성하지 않았어요.</span>
            <Link href="/records/create">술로그 작성하러 가기</Link>
          </div>
        )}
      </div>
      <div className={cx('button-container')}>
        <Button onClick={onClickContact}>문의하기</Button>
        <Button type="outline" onClick={logout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default DrawerContents;
