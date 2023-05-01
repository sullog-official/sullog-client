import { DetailTag, MajorTag } from '@/shared/types/record/flavorTag';

/**
 * 맛 종류 문서: https://docs.google.com/spreadsheets/d/1HItKDWkbNg2vsrbqpdfcDhMcNnKmKkCouMeYWX3v7Bk/edit#gid=0
 * */

const majorFlavorTagAlias: Record<MajorTag, string> = {
  FLOWER: '꽃',
  FRUIT: '과일',
  GRAIN: '곡물',
  NUT: '견과류',
  SWEETENER: '단내',
  DAIRY: '유제품',
};

export const getMajorFlavorTagLabel = (value: MajorTag) => {
  return majorFlavorTagAlias[value];
};

const detailFlavorTagAlias: Record<DetailTag<MajorTag>, string> = {
  // FLOWER
  CHRYSANTHEMUM: '국화',
  PLUM_BLOSSOM: '매화',
  ACACIA: '아카시아',
  LOTUS: '연꽃',
  ROSE: '장미',

  // FRUIT
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

  // GRAIN
  POTATO: '감자',
  FRESHLY_COOKED_RICE: '갓 지은 밥',
  SWEET_POTATO: '고구마',
  GRAIN_POWDER: '곡물가루',
  NURUNGJI: '누룽지',
  WHEAT: '밀',
  RAW_RICE: '생쌀',
  CORN: '옥수수',

  // NUT
  PEANUT: '땅콩',
  CHESTNUT: '밤',
  ALMOND: '아몬드',
  PINE_NUT: '잣',

  // SWEETENER
  HONEY: '꿀',
  MALT_SYRUP: '엿기름',
  BROWN_RICE_SYRUP: '조청',
  CARAMEL: '캬라멜',

  // DAIRY
  BUTTER: '버터',
  YOGURT: '요거트',
  MILK: '우유',
  CHEESE: '치즈',
};

export const getDetailFlavorTagLabel = <TMajorTag extends MajorTag>(
  value: DetailTag<TMajorTag>
) => {
  return detailFlavorTagAlias[value];
};
