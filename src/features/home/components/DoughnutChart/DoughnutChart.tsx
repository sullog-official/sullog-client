import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import color from '@/assets/styles/themes/_color.module.scss';

ChartJS.register(ArcElement);

const { purple, lightPurple300, lightPurple200, lightPurple100 } = color;

const data = {
  labels: ['소주', '과실주', '막걸리', '기타'],
  datasets: [
    {
      label: '# of Votes',
      data: [35, 30, 25, 10],
      backgroundColor: [purple, lightPurple300, lightPurple200, lightPurple100],
      borderColor: [purple, lightPurple300, lightPurple200, lightPurple100],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => {
  return <Doughnut data={data} options={{ cutout: 50 }} />;
};

export default DoughnutChart;
