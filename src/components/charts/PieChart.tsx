import './chart';
import { Pie } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

const data = {
    labels: ['영화', '드라마', '예능'],
    datasets: [
        {
            data: [50, 30, 20],
            backgroundColor: ['#ff4646', '#00c3ff', '#c72dff']
        }
    ]
}

const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    return `${context.label} ${context.raw}%`
                }
            }
        }
    }
}

export default function PieChart() {
    return <Pie data={data} options={options} />;
}