import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { sum } from 'lodash-es';
import { Doughnut } from 'react-chartjs-2';

import color from '@/assets/styles/themes/_color.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const { purple, lightPurple300, lightPurple200, lightPurple100 } = color;

const backgroundColor = [
  purple,
  lightPurple300,
  lightPurple200,
  lightPurple100,
];
const borderColor = [purple, lightPurple300, lightPurple200, lightPurple100];

type DoughnutChartProps = {
  statistics?: any;
};

const DoughnutChart = ({ statistics }: DoughnutChartProps) => {
  const recordStatisticsMap = Object.entries(statistics?.recordStatisticsMap)
    .sort(([, a]: any, [, b]: any) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const totalCount = sum(Object.values(recordStatisticsMap));
  const labels = Object.keys(recordStatisticsMap);
  const data = Object.values(recordStatisticsMap).map((value) => {
    if (typeof value === 'number') return value / totalCount;
  });

  const chartData = {
    labels,
    datasets: [
      {
        backgroundColor,
        borderColor,
        borderWidth: 1,
        data,
      },
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  };

  return <Doughnut data={chartData} />;
};

export default DoughnutChart;
