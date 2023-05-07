import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import Card from '@/features/feed/components/Card';
import { useGetFeed } from '@/shared/apis/feed/getFeed';
import BottomNavigator from '@/shared/components/BottomNavigator';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Feed = () => {
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(8);

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetFeed({
    variables: { cursor, limit },
  });

  if (!data) return null;
  const { allRecordMetaList: feeds, pagingInfo } = data.pages[0];

  return (
    <>
      <TopNavigator title={'이웃 술로그'} highlighted />
      <main className={cx('wrapper')}>
        {feeds.map((feed) => (
          <button key={feed.recordId} type="button">
            <Card alt={feed.alcoholName} imageUrl={feed.mainPhotoPath} />
          </button>
        ))}
      </main>
      <BottomNavigator />
    </>
  );
};

export default Feed;

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetFeed.getKey({ limit: 8 }),
    useGetFeed.queryFn
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
