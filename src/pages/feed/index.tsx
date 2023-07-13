import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Card from '@/features/feed/components/Card';
import { useGetFeed } from '@/shared/apis/feed/getFeed';
import BottomNavigator from '@/shared/components/BottomNavigator';
import PageLayout from '@/shared/components/PageLayout';
import Skeleton from '@/shared/components/Skeleton';
import TopNavigator from '@/shared/components/TopNavigator';
import useIntersect from '@/shared/hooks/useIntersect';
import { Feed } from '@/shared/types/feed';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const FeedPage = () => {
  const [isFirstFetching, setIsFirstFetching] = useState<boolean>(true);

  const { pathname } = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetching, isFetched } =
    useGetFeed({
      variables: {
        cursor: 0,
        limit: 8,
      },
    });

  if (isFetched && isFirstFetching) setIsFirstFetching(false);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const feeds: Feed[] =
    data?.pages.flatMap((page) => page.allRecordMetaList) || [];

  return (
    <PageLayout hasTopNavigatorPadding hasBottomNavigatorPadding>
      <TopNavigator title={'이웃 술로그'} highlighted />
      {feeds.length > 0 ? (
        <div className={cx('grid')}>
          {feeds.map((feed) => (
            <Link key={feed.recordId} href={`/records/${feed.recordId}`}>
              <Card alt={feed.alcoholName} imageUrl={feed.mainPhotoPath} />
            </Link>
          ))}
          {isFetching && isFirstFetching && (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  width="100%"
                  height="100%"
                  padding="50%"
                  key={index}
                />
              ))}
            </>
          )}
          {isFetching && !isFirstFetching && feeds.length > 0 && (
            <>
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  width="100%"
                  height="100%"
                  padding="50%"
                  key={index}
                />
              ))}
            </>
          )}
          <div ref={ref} />
        </div>
      ) : (
        <div className={cx('no-data')}>
          <p>아직 이웃의 술로그가 없습니다.</p>
        </div>
      )}

      <BottomNavigator currentPage={pathname} />
    </PageLayout>
  );
};

export default FeedPage;

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    useGetFeed.getKey({ cursor: 0, limit: 8 }),
    useGetFeed.queryFn
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
