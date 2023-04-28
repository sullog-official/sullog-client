export const flavorMapper = {
  FLOWER: ['CHRYSANTHEMUM', 'PLUM_BLOSSOM', 'ACACIA', 'LOTUS', 'ROSE'] as const,
  FRUIT: [
    'CITRUS',
    'STRAWBERRY',
    'JAPANESE_PLUM',
    'MELON',
    'BANANA',
    'PEAR',
    'PEACH',
    'APPLE',
    'WILD_STRAWBERRY',
    'APRICOT',
    'YUZU',
    'PLUM',
    'CANTALOUPE',
    'PINEAPPLE',
  ] as const,
  GRAIN: [
    'POTATO',
    'FRESHLY_COOKED_RICE',
    'SWEET_POTATO',
    'GRAIN_POWDER',
    'NURUNGJI',
    'WHEAT',
    'RAW_RICE',
    'CORN',
  ] as const,
  NUT: ['PEANUT', 'CHESTNUT', 'ALMOND', 'PINE_NUT'] as const,
  SWEETENER: ['HONEY', 'MALT_SYRUP', 'BROWN_RICE_SYRUP', 'CARAMEL'] as const,
  DAIRY: ['BUTTER', 'YOGURT', 'MILK', 'CHEESE'] as const,
};

export type MajorTag = keyof typeof flavorMapper;

type FlavorTagItem<TMajorTag extends MajorTag> = {
  majorTag: TMajorTag;
  detailTag: typeof flavorMapper[TMajorTag][number];
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
