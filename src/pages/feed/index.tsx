import BottomNavigator from '@/shared/components/BottomNavigator';
import TopNavigator from '@/shared/components/TopNavigator';

const Feed = () => {
  return (
    <>
      <TopNavigator title={'이웃 술로그'} highlighted />
      <main></main>
      <BottomNavigator />
    </>
  );
};

export default Feed;
