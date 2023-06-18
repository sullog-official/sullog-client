import classNames from 'classnames/bind';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import DoughnutChart from '@/features/home/components/DoughnutChart';
import logout from '@/shared/apis/auth/logout';
import { Button } from '@/shared/components';
import { Statistics } from '@/shared/types/record/statistics';

import styles from './DrawerContents.module.scss';

const cx = classNames.bind(styles);

type DrawerContentsProps = {
  statistics?: Statistics;
};

const DrawerContents = ({ statistics }: DrawerContentsProps) => {
  // TODO 글쓰기 기능 연결하고 실제 통계 데이터 출력

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
        <DoughnutChart />
        <p>{statistics?.nickname}님은 10개의 술로그를 남겨주었어요</p>
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
