import {
  DairyFlavorTag,
  flavorMapper,
  FlowerFlavorTag,
  FruitFlavorTag,
  GrainFlavorTag,
  MajorTag,
  NutFlavorTag,
  SweetenerFlavorTag,
} from '@/shared/types/record/flavorTag';

type FlavorTagOptions<TMajorTag extends MajorTag> = {
  majorTag: { label: string; value: TMajorTag };
  detailTags: {
    label: string;
    value: typeof flavorMapper[TMajorTag][number];
  }[];
};

// 맛 종류 문서: https://docs.google.com/spreadsheets/d/1HItKDWkbNg2vsrbqpdfcDhMcNnKmKkCouMeYWX3v7Bk/edit#gid=0
const flowerDetailTagLabels: Record<FlowerFlavorTag['detailTag'], string> = {
  CHRYSANTHEMUM: '국화',
  PLUM_BLOSSOM: '매화',
  ACACIA: '아카시아',
  LOTUS: '연꽃',
  ROSE: '장미',
};

const fruitDetailTagLabels: Record<FruitFlavorTag['detailTag'], string> = {
  CITRUS: '감귤',
  STRAWBERRY: '딸기',
  JAPANESE_PLUM: '매실',
  MELON: '멜론',
  BANANA: '바나나',
  PEAR: '배',
  PEACH: '복숭아',
  APPLE: '사과',
  WILD_STRAWBERRY: '산딸기',
  APRICOT: '살구',
  YUZU: '유자',
  PLUM: '자두',
  CANTALOUPE: '참외',
  PINEAPPLE: '파인애플',
};

const grainDetailTagLabels: Record<GrainFlavorTag['detailTag'], string> = {
  POTATO: '감자',
  FRESHLY_COOKED_RICE: '갓 지은 밥',
  SWEET_POTATO: '고구마',
  GRAIN_POWDER: '곡물가루',
  NURUNGJI: '누룽지',
  WHEAT: '밀',
  RAW_RICE: '생쌀',
  CORN: '옥수수',
};

const nutDetailTagLabels: Record<NutFlavorTag['detailTag'], string> = {
  PEANUT: '땅콩',
  CHESTNUT: '밤',
  ALMOND: '아몬드',
  PINE_NUT: '잣',
};

const sweetenerDetailTagLabels: Record<
  SweetenerFlavorTag['detailTag'],
  string
> = {
  HONEY: '꿀',
  MALT_SYRUP: '엿기름',
  BROWN_RICE_SYRUP: '조청',
  CARAMEL: '캬라멜',
};

const dairyDetailTagLabels: Record<DairyFlavorTag['detailTag'], string> = {
  BUTTER: '버터',
  YOGURT: '요거트',
  MILK: '우유',
  CHEESE: '치즈',
};

export const FLAVOR_TAGS: FlavorTagOptions<MajorTag>[] = [
  {
    majorTag: {
      label: '꽃',
      value: 'FLOWER',
    },
    detailTags: Object.entries(flowerDetailTagLabels).map(([key, label]) => ({
      label,
      value: key,
    })),
  } as FlavorTagOptions<'FLOWER'>,
  {
    majorTag: {
      label: '과일',
      value: 'FRUIT',
    },
    detailTags: Object.entries(fruitDetailTagLabels).map(([key, label]) => ({
      label,
      value: key,
    })),
  } as FlavorTagOptions<'FRUIT'>,
  {
    majorTag: {
      label: '곡물',
      value: 'GRAIN',
    },
    detailTags: Object.entries(grainDetailTagLabels).map(([key, label]) => ({
      label,
      value: key,
    })),
  } as FlavorTagOptions<'GRAIN'>,
  {
    majorTag: {
      label: '견과류',
      value: 'NUT',
    },
    detailTags: Object.entries(nutDetailTagLabels).map(([key, label]) => ({
      label,
      value: key,
    })),
  } as FlavorTagOptions<'NUT'>,
  {
    majorTag: {
      label: '단내',
      value: 'SWEETENER',
    },
    detailTags: Object.entries(sweetenerDetailTagLabels).map(
      ([key, label]) => ({
        label,
        value: key,
      })
    ),
  } as FlavorTagOptions<'SWEETENER'>,
  {
    majorTag: {
      label: '유제품',
      value: 'DAIRY',
    },
    detailTags: Object.entries(dairyDetailTagLabels).map(([key, label]) => ({
      label,
      value: key,
    })),
  } as FlavorTagOptions<'DAIRY'>,
];
