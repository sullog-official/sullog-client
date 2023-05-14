import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';

import DrawerContents from '@/features/home/components/DrawerContents';
import Drawer from '@/shared/components/Drawer';
import Icon from '@/shared/components/Icon';
import { useModal } from '@/shared/hooks/useModal';

import styles from './BottomNavigator.module.scss';

const cx = classNames.bind(styles);

const BottomNavigator = () => {
  const router = useRouter();

  const [isDrawerOpen, openDrawer, closeDrawer] = useModal();

  const navigateToWrite = () => {
    router.push('/alcohols/search');
  };

  const navigateToFeed = () => {
    router.push('/feed');
  };

  return (
    <>
      <nav className={cx('wrapper')}>
        <button
          onClick={navigateToWrite}
          type="button"
          className={cx('writeBtn')}
        >
          <Icon name="Write" size={14} />
          <p>글쓰기</p>
        </button>
        {/* TODO: button active 시 아이콘 변경 */}
        <div className={cx('container')}>
          <button
            onClick={navigateToFeed}
            type="button"
            className={cx('navBtn')}
          >
            <Icon name="Feed" size={28} />
            <p>둘러보기</p>
          </button>
          <button onClick={openDrawer} type="button" className={cx('navBtn')}>
            <Icon name="Menu" size={20} />
            <p>메뉴</p>
          </button>
        </div>
      </nav>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <DrawerContents />
      </Drawer>
    </>
  );
};

export default BottomNavigator;
