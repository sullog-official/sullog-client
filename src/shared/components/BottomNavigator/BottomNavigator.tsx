import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';

import DrawerContents from '@/features/home/components/DrawerContents';
import Drawer from '@/shared/components/Drawer';
import Icon from '@/shared/components/Icon';

import styles from './BottomNavigator.module.scss';

const cx = classNames.bind(styles);

const BottomNavigator = () => {
  const router = useRouter();

  const [isFeedBtnClicked, setIsFeedBtnClicked] = useState(false);
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);

  const navigateToWrite = () => {};

  const navigateToFeed = () => {
    setIsFeedBtnClicked(true);
    setIsMenuBtnClicked(false);
    router.push('/feed');
  };

  const openMenuDrawer = () => {
    setIsFeedBtnClicked(false);
    setIsMenuBtnClicked(true);
  };

  const closeDrawer = () => {
    setIsMenuBtnClicked(false);
  };

  return (
    <nav className={cx('wrapper')}>
      <button
        onClick={navigateToWrite}
        type="button"
        className={cx('writeBtn')}
      >
        <Icon name="Write" size={14} />
        <p>글쓰기</p>
      </button>
      <div className={cx('container')}>
        <button
          onClick={navigateToFeed}
          type="button"
          className={cx('navBtn', isFeedBtnClicked && 'isFeedBtnClicked')}
        >
          <Icon name="Feed" size={28} />
          <p>둘러보기</p>
        </button>
        <button
          onClick={openMenuDrawer}
          type="button"
          className={cx('navBtn', isMenuBtnClicked && 'isMenuBtnClicked')}
        >
          <Icon name="Menu" size={20} />
          <p>메뉴</p>
        </button>
      </div>
      <Drawer isOpen={isMenuBtnClicked} onClose={closeDrawer}>
        <DrawerContents onClose={closeDrawer} />
      </Drawer>
    </nav>
  );
};

export default BottomNavigator;
