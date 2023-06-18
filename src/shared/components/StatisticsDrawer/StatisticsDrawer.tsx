import DrawerContents from '@/features/home/components/DrawerContents';
import { useGetStatistics } from '@/shared/apis/records/getStatistics';
import Drawer from '@/shared/components/Drawer';

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
      {statistics && <DrawerContents statistics={statistics} />}
    </Drawer>
  );
};

export default StatisticsDrawer;
