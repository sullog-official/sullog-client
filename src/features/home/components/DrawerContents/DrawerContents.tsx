import classNames from 'classnames/bind';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import DoughnutChart from '@/features/home/components/DoughnutChart';
import logout from '@/shared/apis/auth/logout';
import { Button } from '@/shared/components';

import styles from './DrawerContents.module.scss';

const cx = classNames.bind(styles);

const DrawerContents = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title-box')}>
        <p>
          <span className={cx('name')}>이짱구</span>님 환영해요!
        </p>
        <p>오늘도 나만의 술로그를 남겨보아요</p>
      </div>
      <div className={cx('chart-container')}>
        <p style={mapoFlowerIsland.style}>나의 술로그</p>
        <DoughnutChart />
        <p>술짱조아 님은 10개의 술로그를 남겨주었어요</p>
      </div>
      <div className={cx('button-container')}>
        {/*TODO: 문의하기 기능에 대한 논의 필요*/}
        <Button>문의하기</Button>
        <Button type="outline" onClick={logout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default DrawerContents;
