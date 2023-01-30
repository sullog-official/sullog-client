// TODO : grey50 추가
export type Color =
  | 'white'
  | 'black'
  | 'purple'
  | `purpleOpacity${5 | 60}`
  | `lightPurple${100 | 200 | 300}`
  | `grey${100 | 200 | 300 | 400 | 500 | 600}`;

export type Typography =
  | `title${40 | 26 | 20 | 18}`
  | `body${16 | 15 | 14 | 13}`
  | `caption${12 | 11 | 10}`;
