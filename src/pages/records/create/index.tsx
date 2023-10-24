import {
  type DehydratedState,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import classNames from 'classnames/bind';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Controller } from 'react-hook-form';

import AlcoholPercentFeelingInput from '@/features/record/components/AlcoholPercentFeelingInput';
import DetailFlavorInput from '@/features/record/components/DetailFlavorInput';
import FlavorSliderGroup from '@/features/record/components/FlavorSliderGroup';
import ImageSwiper from '@/features/record/components/ImageSwiper';
import Rating from '@/features/record/components/Rating';
import { useCreateRecordForm } from '@/features/record/hooks/useCreateRecordForm';
import { useGetAlcohol } from '@/shared/apis/alcohols/getAlcohol';
import PageLayout from '@/shared/components/PageLayout';
import TextArea from '@/shared/components/TextArea';
import TextField from '@/shared/components/TextField';
import TopNavigator from '@/shared/components/TopNavigator';
import useConfirm from '@/shared/hooks/useConfirm';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

type RecordCreateProps = {
  alcoholId: number;
};

const RecordCreate = ({ alcoholId }: RecordCreateProps) => {
  const router = useRouter();
  const { confirm } = useConfirm();

  const { data: alcohol } = useGetAlcohol({ variables: { alcoholId } });

  const { control, formState, handleSubmit } = useCreateRecordForm({
    alcoholId,
  });
  const { isSubmitting } = formState;

  if (!alcohol) {
    return null;
  }

  const onClickBackBtn = async () => {
    if (
      await confirm({
        message: '작성하신 내용이 저장되지 않습니다.',
        okText: '확인',
      })
    ) {
      router.back();
    }
  };

  return (
    <PageLayout hasTopNavigatorPadding>
      <form>
        <TopNavigator
          onBack={onClickBackBtn}
          title="게시글"
          extra={
            <button
              disabled={isSubmitting}
              type="submit"
              className={cx('submit-button')}
              onClick={handleSubmit}
              data-disabled={!formState.isValid}
            >
              완료
            </button>
          }
        />
        <Controller
          name="photoList"
          control={control}
          rules={{
            validate: (value) =>
              value.length > 0 || '사진을 1장 이상 등록해주세요',
          }}
          render={({ field }) => (
            <ImageSwiper
              {...field}
              mode="edit"
              max={3}
              images={field.value}
              onImagesChange={field.onChange}
            />
          )}
        />
        <div className={cx('contents')}>
          <div className={cx('input-row')}>
            <TextField
              className={cx('name')}
              label="술이름"
              value={alcohol.alcoholName}
              disabled
            />
            <TextField
              className={cx('category')}
              label="주종"
              // TODO: 주종 필드 api 연동
              value="기타"
              disabled
            />
          </div>
          <div className={cx('input-row')}>
            <TextField
              className={cx('brand')}
              label="브랜드"
              value={alcohol.brandName}
              disabled
            />
            <Controller
              name="experienceDate"
              control={control}
              rules={{
                required: { value: true, message: '날짜를 입력해주세요' },
              }}
              render={({ field }) => (
                <TextField
                  className={cx('date')}
                  label="날짜"
                  type="date"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
          <TextField
            className={cx('brand')}
            label="지역"
            value={alcohol.productionLocation}
            disabled
          />
          <Controller
            name="starScore"
            control={control}
            rules={{
              required: {
                value: true,
                message: '별점을 입력해주세요 (0.5 이상)',
              },
              validate: (value) =>
                value !== 0 || '별점을 입력해주세요 (0.5 이상)',
            }}
            render={({ field }) => (
              <Rating className={cx('rating')} label="별점" {...field} />
            )}
          />
          <Controller
            name="alcoholPercentFeeling"
            control={control}
            rules={{
              required: { value: true, message: '도수를 입력해주세요' },
            }}
            render={({ field }) => (
              <AlcoholPercentFeelingInput
                label="도수"
                alcoholPercent={alcohol.alcoholPercent}
                {...field}
              />
            )}
          />
          <Controller
            name="flavorScore"
            control={control}
            rules={{
              required: { value: true, message: '플레이버를 입력해주세요' },
            }}
            render={({ field }) => (
              <FlavorSliderGroup label="플레이버" {...field} />
            )}
          />
          <Controller
            name="flavorTagList"
            control={control}
            render={({ field }) => (
              <DetailFlavorInput label="상세 플레이버 (선택)" {...field} />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: { value: true, message: '상세 내용을 입력해주세요' },
            }}
            render={({ field }) => (
              <TextArea
                className={cx('detail-text')}
                label="상세 내용"
                placeholder="내용을 입력해주세요"
                rows={8}
                {...field}
              />
            )}
          />
        </div>
      </form>
    </PageLayout>
  );
};

export default RecordCreate;

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
  alcoholId: number;
}> = async ({ query }) => {
  if (!query.alcoholId) {
    // TODO: alcoholId가 없는 경우 어떻게 처리할지 논의 필요
    return {
      notFound: true,
    };
  }

  const alcoholId = parseInt(query.alcoholId.toString());

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetAlcohol.getKey({ alcoholId }),
    useGetAlcohol.queryFn
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      alcoholId,
    },
  };
};
