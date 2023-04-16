import classNames from 'classnames/bind';

import { Close } from '@/assets/icons';
import { Button } from '@/shared/components';

import styles from './DrawerContents.module.scss';

const cx = classNames.bind(styles);

const DrawerContents = () => {
  return (
    <div className={cx('wrapper')}>
      <button className={cx('close-btn')}>
        <Close size={16} />
      </button>
      <div className={cx('title-box')}>
        <p>
          <span className={cx('name')}>이짱구</span>님 환영해요!
        </p>
        <p>오늘도 나만의 술로그를 남겨보아요</p>
      </div>
      <div className={cx('button-container')}>
        <Button>문의하기</Button>
        <Button type="outline">로그아웃</Button>
      </div>
    </div>
  );
};

export default DrawerContents;
