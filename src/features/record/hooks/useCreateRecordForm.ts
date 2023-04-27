import dayjs from 'dayjs';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

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
          scentScore: data.flavorScore.scentScore,
          tasteScore: data.flavorScore.tasteScore,
          textureScore: data.flavorScore.textureScore,
          description: data.description,
          experienceDate: data.experienceDate,
        },
      },
      {
        onSuccess: () => {
          // TODO: 생성된 기록으로 이동
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
