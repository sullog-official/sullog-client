export type Statistics = {
  memberId: number;
  email: string;
  nickname: string;
  recordStatisticsMap: {
    [key: string]: number;
  };
};
