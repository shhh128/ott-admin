import './chart';
import { Line } from 'react-chartjs-2';

const days = [3, 2, 1, 0]

const labels = days.map((day) => {
    const date = new Date();
    
    date.setDate(date.getDate() - day);

    return `${date.getMonth() + 1}/${date.getDate()}`;
})

const data = {
    labels,
    datasets: [
        {
            label: '가입자 수',
            data: [80, 100, 150, 50],
            borderColor: '#4b6cff',
            tension: 0.4,
            pointRadius: 0
        }
    ]
}

export default function LineChart() {
    return <Line data={data} />;
}