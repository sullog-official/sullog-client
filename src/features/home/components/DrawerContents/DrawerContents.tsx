import classNames from 'classnames/bind';

import { mapoFlowerIsland } from '@/assets/styles/fonts';
import DoughnutChart from '@/features/home/components/DoughnutChart';
import { deleteUser } from '@/shared/apis/auth/delete';
import { Button } from '@/shared/components';
import useAuth from '@/shared/hooks/useAuth';
import useConfirm from '@/shared/hooks/useConfirm';
import type { Statistics } from '@/shared/types/record/statistics';

import styles from './DrawerContents.module.scss';

const cx = classNames.bind(styles);

type DrawerContentsProps = {
  statistics: Statistics;
};

const DrawerContents = ({ statistics }: DrawerContentsProps) => {
  const { logout } = useAuth();
  const { confirm } = useConfirm();

  const recordsCount = Object?.values(statistics?.recordStatisticsMap).reduce(
    (acc, cur) => acc + cur,
    0
  );

  const onClickContact = () => {
    window.location.href = 'mailto:gino9940@gmail.com';
  };

  const handleClickDelete = async () => {
    if (
      await confirm({
        message: '정말 회원탈퇴를 하시겠어요?',
        okText: '확인',
      })
    ) {
      await deleteUser();
      logout();
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title-box')}>
        <p>
          <span className={cx('name')}>{statistics?.nickname}</span>님 환영해요!
        </p>
        <p>오늘도 나만의 술로그를 남겨보아요</p>
      </div>
      {recordsCount > 0 ? (
        <div className={cx('chart-container')}>
          <p style={mapoFlowerIsland.style}>나의 술로그</p>
          <DoughnutChart statistics={statistics} />
          <p>
            {statistics?.nickname}님은 {recordsCount}개의 술로그를 남겨주었어요
          </p>
        </div>
      ) : (
        <div>
          <p className={cx('no-data')}>
            <span>아직 술로그를 작성하지 않았어요.</span>
            <span>술로그로 가득 채워보세요!</span>
          </p>
        </div>
      )}
      <div className={cx('button-container')}>
        <Button buttonType="button" onClick={onClickContact}>
          문의하기
        </Button>
        <Button buttonType="button" type="outline" onClick={logout}>
          로그아웃
        </Button>
      </div>
      <button
        type="button"
        className={cx('delete-button')}
        onClick={handleClickDelete}
      >
        회원탈퇴
      </button>
    </div>
  );
};

export default DrawerContents;
