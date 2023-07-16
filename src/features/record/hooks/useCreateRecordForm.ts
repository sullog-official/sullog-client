import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import { DEFAULT_FLAVOR_SCORE } from '@/features/record/components/FlavorSliderGroup/FlavorSliderGroup';
import { useCreateRecord } from '@/shared/apis/records/createRecord';
import { Alcohol } from '@/shared/types/alcohol';
import { Record } from '@/shared/types/record';
import { FlavorTag } from '@/shared/types/record/flavorTag';

type useCreateRecordFormProps = Pick<Alcohol, 'alcoholId'>;

type CreateRecordForm = {
  photoList: { url?: string; file?: File | null }[];
  flavorScore: Pick<Record, 'scentScore' | 'tasteScore' | 'textureScore'>;
  flavorTag: FlavorTag;
} & Pick<
  Record,
  'experienceDate' | 'alcoholPercentFeeling' | 'starScore' | 'description'
>;

export const useCreateRecordForm = ({
  alcoholId,
}: useCreateRecordFormProps) => {
  const router = useRouter();
  const form = useForm<CreateRecordForm>({
    defaultValues: {
      photoList: [],
      experienceDate: dayjs().format('YYYY-MM-DD'),
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
          flavorTagList: [data.flavorTag],
          starScore: data.starScore,
          scentScore: data.flavorScore?.scentScore ?? DEFAULT_FLAVOR_SCORE,
          tasteScore: data.flavorScore?.tasteScore ?? DEFAULT_FLAVOR_SCORE,
          textureScore: data.flavorScore?.textureScore ?? DEFAULT_FLAVOR_SCORE,
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
