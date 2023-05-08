import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { GetServerSideProps } from 'next';

import Card from '@/features/feed/components/Card';
import { useGetFeed } from '@/shared/apis/feed/getFeed';
import BottomNavigator from '@/shared/components/BottomNavigator';
import TopNavigator from '@/shared/components/TopNavigator';
import useIntersect from '@/shared/hooks/useIntersect';
import { Feed } from '@/shared/types/feed';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const FeedPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetFeed({
      variables: {
        cursor: 0,
        limit: 8,
      },
    });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  if (!data) return null;

  const feeds: Feed[] = [];
  data.pages.map((page) => {
    page.allRecordMetaList.map((feed) => {
      feeds.push(feed);
    });
  });

  return (
    <>
      <TopNavigator title={'이웃 술로그'} highlighted />
      <main className={cx('wrapper')}>
        {feeds.map((feed) => (
          <button key={feed.recordId} type="button">
            <Card alt={feed.alcoholName} imageUrl={feed.mainPhotoPath} />
          </button>
        ))}
        <div ref={ref} />
      </main>
      <BottomNavigator />
    </>
  );
};

export default FeedPage;

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGetFeed.getKey({ cursor: 0, limit: 8 }),
    useGetFeed.queryFn
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
