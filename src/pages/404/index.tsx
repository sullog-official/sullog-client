import classNames from 'classnames/bind';
import { router } from 'next/client';
import Image from 'next/image';

import { Button } from '@/shared/components';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const NotFoundPage = () => {
  const handleGoHome = () => router.push('/');

  return (
    <PageLayout hasTopNavigatorPadding>
      <TopNavigator title={'나의 술로그'} highlighted />
      <div className={cx('contents')}>
        <Image src="/404.svg" alt="404" width={120} height={120} />
        <h1 className={cx('title')}>잘못된 접근입니다.</h1>
        <p className={cx('info')}>
          지금 입력하신 주소는 잘못 입력되었거나,
          <br /> 변경 혹은 삭제됐을 수 있습니다.
        </p>
        <Button className={cx('button')} onClick={handleGoHome}>
          홈으로 가기
        </Button>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
