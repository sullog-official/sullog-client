import classNames from 'classnames/bind';

import DrawerContents from '@/features/home/components/DrawerContents';
import { useGetStatistics } from '@/shared/apis/records/getStatistics';
import Drawer from '@/shared/components/Drawer';

import styles from './StatisticsDrawer.module.scss';

const cx = classNames.bind(styles);

type StatisticsDrawerProps = {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
};

const StatisticsDrawer = ({
  isDrawerOpen,
  closeDrawer,
}: StatisticsDrawerProps) => {
  const { data: statistics } = useGetStatistics();

  return (
    <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
      {statistics ? (
        <DrawerContents statistics={statistics} />
      ) : (
        <p className={cx('error')}>
          데이터를 불러오는데 실패했습니다. <br />
          잠시 후에 다시 접속해주세요.
        </p>
      )}
    </Drawer>
  );
};

export default StatisticsDrawer;
