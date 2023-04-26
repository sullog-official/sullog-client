import dayjs from 'dayjs';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import { useCreateRecord } from '@/shared/apis/records/createRecord';
import { Alcohol } from '@/shared/types/alcohol';
import { Record } from '@/shared/types/record';
import { FlavorTag } from '@/shared/types/record/flavorTag';

type useCreateRecordFormProps = Pick<Alcohol, 'alcoholId'>;

type CreateRecordForm = {
  photoList: File[];
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
    console.log('data', data);

    // TODO
    // const res = await createRecord(
    //   {
    //     photoList: data.photoList,
    //     recordInfo: {
    //       alcoholId,
    //       alcoholPercentFeeling: data.alcoholPercentFeeling,
    //       flavorTagList: [data.flavorTag],
    //       starScore: data.starScore,
    //       scentScore: data.flavorScore.scentScore,
    //       tasteScore: data.flavorScore.tasteScore,
    //       textureScore: data.flavorScore.textureScore,
    //       description: data.description,
    //       experienceDate: data.experienceDate,
    //     },
    //   },
    //   {
    //     onSuccess: () => {
    //       console.log('기록 생성');
    //     },
    //   }
    // );
    // console.log('res', res);
  };

  const onError: SubmitErrorHandler<CreateRecordForm> = (errors) => {
    const error =
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
