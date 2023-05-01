import { FLAVOR_TAGS } from '@/shared/constants/flavorTags';
import { DetailTag, MajorTag } from '@/shared/types/record/flavorTag';

import {
  getDetailFlavorTagLabel,
  getMajorFlavorTagLabel,
} from '../../utils/getFlavorTagLabel';

type FlavorTagOptions<TMajorTag extends MajorTag> = {
  majorTag: { label: string; value: TMajorTag };
  detailTags: {
    label: string;
    value: DetailTag<TMajorTag>;
  }[];
};

export const flavorTagOptions: FlavorTagOptions<MajorTag>[] = (
  ['FLOWER', 'FRUIT', 'GRAIN', 'NUT', 'SWEETENER', 'DAIRY'] as const
).map((majorTagValue) => ({
  majorTag: {
    label: getMajorFlavorTagLabel(majorTagValue),
    value: majorTagValue,
  },
  detailTags: FLAVOR_TAGS[majorTagValue].map((value) => ({
    label: getDetailFlavorTagLabel(value),
    value,
  })),
}));
