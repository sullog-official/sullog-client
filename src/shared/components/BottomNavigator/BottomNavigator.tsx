import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Icon from '@/shared/components/Icon';
import StatisticsDrawer from '@/shared/components/StatisticsDrawer';
import { useModal } from '@/shared/hooks/useModal';
import { Statistics } from '@/shared/types/record/statistics';

import styles from './BottomNavigator.module.scss';

const AlcoholSearchModal = dynamic(
  () => import('@/features/search/components/AlcoholSearchModal')
);

const cx = classNames.bind(styles);

type BottomNavigatorProps = {
  statistics?: Statistics;
  currentPage?: string;
};

const BottomNavigator = ({ statistics, currentPage }: BottomNavigatorProps) => {
  const router = useRouter();

  const [isDrawerOpen, openDrawer, closeDrawer] = useModal();
  const [
    isAlcoholSearchModalOpen,
    openAlcoholSearchModalOpen,
    closeAlcoholSearchModalOpen,
  ] = useModal();

  const navigateToFeed = () => {
    router.push('/feed');
  };

  return (
    <>
      <nav className={cx('wrapper')}>
        <button
          onClick={openAlcoholSearchModalOpen}
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
            <Icon
              name="Feed"
              size={28}
              color={currentPage ? '/feed' && 'purple' : 'white'}
            />
            <p>둘러보기</p>
          </button>
          <button onClick={openDrawer} type="button" className={cx('navBtn')}>
            <Icon name="Menu" size={20} />
            <p>메뉴</p>
          </button>
        </div>
      </nav>
      <StatisticsDrawer isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />
      {isAlcoholSearchModalOpen && (
        <AlcoholSearchModal onClose={closeAlcoholSearchModalOpen} />
      )}
    </>
  );
};

export default BottomNavigator;
