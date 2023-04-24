import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

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

  const { mutate: createRecord } = useCreateRecord();

  const submit = form.handleSubmit(async (data) => {
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
  });

  return { control: form.control, handleSubmit: submit };
};
