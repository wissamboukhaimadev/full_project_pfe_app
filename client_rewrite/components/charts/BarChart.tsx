import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const data = {
    labels,
    datasets: [
        {
            label: 'Electricity',
            data: labels.map(() => 10),
            backgroundColor: 'rgba(232, 232, 30, 1)',
        },
        {
            label: 'Water',
            data: labels.map(() => 20),
            backgroundColor: 'rgba(30, 198, 232, 1)',
        },
    ],
};

export default function BarChart() {
    return (
        <Bar options={options} data={data} />
    )
}
