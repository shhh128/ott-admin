import './chart';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

const data = {
    labels: ['공개 완료', '공개 예정', '비공개'],
    datasets: [
        {
            label: '콘텐츠 수',
            data: [1000, 100, 250],
            backgroundColor: '#999',
            barThickness: 40
        }
    ]
}

const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        }
    },
    scales: {
        y: {
            ticks: {
                stepSize: 50
            }
        }
    }
}

export default function BarChart() {
    return <Bar data={data} options={options} />;
}