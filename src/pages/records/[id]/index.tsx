import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { isNil } from 'lodash-es';
import { GetServerSideProps } from 'next';
import { useCallback } from 'react';

import FlavorSliderGroup from '@/features/record/components/FlavorSliderGroup';
import ImageSwiper from '@/features/record/components/ImageSwiper';
import { getAlcoholPercentFeelingLabel } from '@/features/record/utils/getAlcoholPercentFeelingLabel';
import { getDetailFlavorTagLabel } from '@/features/record/utils/getFlavorTagLabel';
import { useGetRecord } from '@/shared/apis/records/getRecord';
import Chip from '@/shared/components/Chip';
import Icon from '@/shared/components/Icon';
import PageLayout from '@/shared/components/PageLayout';
import TopNavigator from '@/shared/components/TopNavigator';
import useConfirm from '@/shared/hooks/useConfirm';
import { Alcohol } from '@/shared/types/alcohol';
import { Record } from '@/shared/types/record';
import { FlavorTag } from '@/shared/types/record/flavorTag';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

type RecordDetailProps = {
  id: number;
};

const RecordDetail = ({ id }: RecordDetailProps) => {
  const { data } = useGetRecord({ variables: { recordId: id } });
  const { confirm } = useConfirm();

  const formatRecordTags = useCallback(
    ([alcoholPercent, alcoholPercentFeeling, flavorDetailTag]: [
      Alcohol['alcoholPercent'],
      Record['alcoholPercentFeeling'],
      FlavorTag['detailTag']
    ]) => {
      return [
        !isNil(alcoholPercent) ? `${alcoholPercent}도` : '',
        alcoholPercentFeeling
          ? getAlcoholPercentFeelingLabel(alcoholPercentFeeling)
          : '',
        flavorDetailTag ? getDetailFlavorTagLabel(flavorDetailTag) : '',
      ].filter((tag) => !!tag);
    },
    []
  );

  const handleClickReport = async () => {
    if (
      await confirm({
        message: '정말 신고하시겠어요?',
        okText: '확인',
      })
    ) {
      window.location.href = 'mailto:gino9940@gmail.com';
    }
  };

  if (!data) {
    return null;
  }

  const { alcoholInfo, record } = data;

  return (
    <PageLayout hasTopNavigatorPadding>
      <TopNavigator title="내 게시글" />
      <ImageSwiper images={record.photoPathList.map((url) => ({ url }))} />
      <div className={cx('contents-wrap')}>
        <div className={cx('above-title')}>
          <Chip
            label="과실주"
            type="Primary"
            appearance="round"
            size="mediumLarge"
          />
          <button
            onClick={handleClickReport}
            className={cx('report-button')}
            type="button"
          >
            신고하기
          </button>
        </div>
        <div className={cx('title-area')}>
          <h1 className={cx('title')}>{alcoholInfo.alcoholName}</h1>
          <span className={cx('location')}>
            {alcoholInfo.productionLocation}
          </span>
        </div>
        <div className={cx('tags')}>
          {formatRecordTags([
            alcoholInfo.alcoholPercent,
            record.alcoholPercentFeeling,
            record.flavorTagList?.[0]?.detailTag,
          ]).map((label) => (
            <Chip
              key={label}
              className={cx('tag')}
              label={label}
              type="OutlinedPurple"
              appearance="round"
              size="mediumSmall"
            />
          ))}
        </div>
        <div className={cx('rate')}>
          <Icon name="Star" size={18} />
          <span>{record.starScore}</span>
        </div>
        <FlavorSliderGroup
          className={cx('flavor-slider-group')}
          readOnly
          value={{
            scentScore: record.scentScore,
            tasteScore: record.tasteScore,
            textureScore: record.textureScore,
          }}
        />
        <p className={cx('detail')}>{record.description}</p>
        <div className={cx('date')}>
          {dayjs(record.experienceDate).format('YYYY.MM.DD')}
        </div>
      </div>
    </PageLayout>
  );
};

export default RecordDetail;

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
  id: number;
}> = async ({ query }) => {
  if (!query.id) {
    // TODO: record id가 없는 경우 어떻게 처리할지 논의 필요
    return {
      notFound: true,
    };
  }

  const recordId = parseInt(query.id.toString());

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetRecord.getKey({ recordId }),
    useGetRecord.queryFn
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: recordId,
    },
  };
};
