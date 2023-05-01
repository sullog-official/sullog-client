import { FLAVOR_TAGS } from '@/shared/constants/flavorTags';

export type MajorTag = keyof typeof FLAVOR_TAGS;
export type DetailTag<TMajorTag extends MajorTag> =
  typeof FLAVOR_TAGS[TMajorTag][number];

type FlavorTagItem<TMajorTag extends MajorTag> = {
  majorTag: TMajorTag;
  detailTag: DetailTag<TMajorTag>;
};

export type FlowerFlavorTag = FlavorTagItem<'FLOWER'>;
export type FruitFlavorTag = FlavorTagItem<'FRUIT'>;
export type GrainFlavorTag = FlavorTagItem<'GRAIN'>;
export type NutFlavorTag = FlavorTagItem<'NUT'>;
export type SweetenerFlavorTag = FlavorTagItem<'SWEETENER'>;
export type DairyFlavorTag = FlavorTagItem<'DAIRY'>;

export type FlavorTag =
  | FlowerFlavorTag
  | FruitFlavorTag
  | GrainFlavorTag
  | NutFlavorTag
  | SweetenerFlavorTag
  | DairyFlavorTag;
