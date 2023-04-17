import classNames from 'classnames/bind';

import { Close } from '@/assets/icons';
import { mapoFlowerIsland } from '@/assets/styles/fonts';
import DoughnutChart from '@/features/home/components/DoughnutChart';
import { Button } from '@/shared/components';

import styles from './DrawerContents.module.scss';

const cx = classNames.bind(styles);

type Props = {
  onClose: () => void;
};

const DrawerContents = ({ onClose }: Props) => {
  return (
    <div className={cx('wrapper')}>
      <button
        className={cx('close-btn')}
        type="button"
        aria-label="메뉴 닫기"
        onClick={onClose}
      >
        <Close size={16} />
      </button>
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
        <Button>문의하기</Button>
        <Button type="outline">로그아웃</Button>
      </div>
    </div>
  );
};

export default DrawerContents;
