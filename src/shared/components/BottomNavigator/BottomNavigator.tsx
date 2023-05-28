import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import DrawerContents from '@/features/home/components/DrawerContents';
import Drawer from '@/shared/components/Drawer';
import Icon from '@/shared/components/Icon';
import { useModal } from '@/shared/hooks/useModal';
import { Statistics } from '@/shared/types/record/statistics';

import styles from './BottomNavigator.module.scss';

const cx = classNames.bind(styles);

type BottomNavigatorProps = {
  statistics?: Statistics;
};

const BottomNavigator = ({ statistics }: BottomNavigatorProps) => {
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
        <DrawerContents statistics={statistics} />
      </Drawer>
    </>
  );
};

export default BottomNavigator;
