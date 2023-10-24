import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';

import { useCreateRecord } from '@/shared/apis/records/createRecord';
import type { Alcohol } from '@/shared/types/alcohol';
import type { Record } from '@/shared/types/record';

import { FLAVOR_SLIDER_GROUP_DEFAULT_VALUE } from '../components/FlavorSliderGroup/FlavorSliderGroup';

type useCreateRecordFormProps = Pick<Alcohol, 'alcoholId'>;

type CreateRecordForm = {
  photoList: { url?: string; file?: File | null }[];
  flavorScore: Pick<Record, 'scentScore' | 'tasteScore' | 'textureScore'>;
} & Pick<
  Record,
  | 'experienceDate'
  | 'alcoholPercentFeeling'
  | 'starScore'
  | 'description'
  | 'flavorTagList'
>;

export const useCreateRecordForm = ({
  alcoholId,
}: useCreateRecordFormProps) => {
  const router = useRouter();
  const form = useForm<CreateRecordForm>({
    defaultValues: {
      photoList: [],
      experienceDate: dayjs().format('YYYY-MM-DD'),
      flavorScore: FLAVOR_SLIDER_GROUP_DEFAULT_VALUE,
      flavorTagList: [],
    },
  });

  const { handleSubmit, control, formState } = form;

  const { mutate: createRecord } = useCreateRecord();

  const onSubmit: SubmitHandler<CreateRecordForm> = async (data) => {
    const files = data.photoList
      .filter((file) => !!file)
      .map(({ file }) => file!);

    await createRecord(
      {
        photoList: files,
        recordInfo: {
          alcoholId,
          alcoholPercentFeeling: data.alcoholPercentFeeling,
          flavorTagList: data.flavorTagList,
          starScore: data.starScore,
          scentScore: data.flavorScore.scentScore,
          tasteScore: data.flavorScore.tasteScore,
          textureScore: data.flavorScore.textureScore,
          description: data.description,
          experienceDate: data.experienceDate,
        },
      },
      {
        onSuccess: (data) => {
          router.replace(`/records/${data.recordId}`);
        },
      }
    );
  };

  const onError: SubmitErrorHandler<CreateRecordForm> = (errors) => {
    const error =
      errors.photoList ||
      errors.experienceDate ||
      errors.starScore ||
      errors.alcoholPercentFeeling ||
      errors.flavorScore ||
      errors.description;

    if (error?.message) {
      // TODO: 에러메시지 UI 논의 후 수정
      alert(error.message);
    }
  };

  return {
    control,
    formState,
    handleSubmit: handleSubmit(onSubmit, onError),
  };
};
