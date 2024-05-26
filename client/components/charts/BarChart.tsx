import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);




interface IBarChart {
    selectedDepartment: string | null,
    data_database: any[],
    labelsFormat: string | null
    showValue: string[]

}

export default function BarChart({ data_database, labelsFormat, selectedDepartment, showValue }: IBarChart) {

    const [defaultChartData, setDefaultChatData] = useState<any>([])


    useEffect(() => {

        fetchingData()

    }, [])

    const fetchingData = async () => {
        const startDate = new Date()
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 1)


        const data_body = {
            "startDate": startDate,
            "endDate": endDate,
            "Department": "Global",
            "Settings": "yearly"
        }

        const response = await fetch("http://localhost:4000/api/v1/global/chart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_body)

        })

        const data_json = await response.json()

        setDefaultChatData(data_json)

    }

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

    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    if (labelsFormat === "hours of day") {
        labels = Array.from({ length: 24 }, (_, index) => index.toString())
    } else if (labelsFormat === "days of the week") {
        labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    } else {
        labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"]
    }

    const colorMapping: { [key: string]: string } = {
        Current: 'rgba(255, 99, 132, 0.2)',
        Tension: 'rgba(54, 162, 235, 0.2)',
        // Add more mappings for other possible values
    };

    const data = {
        labels,
        datasets: showValue.length <= 0 ?
            [
                {
                    label: "Tension",
                    data: labels.map((_, index) => {
                        if (defaultChartData.length > 0) {
                            if (defaultChartData[index]) return defaultChartData[index].tension;
                            return 0;
                        }
                        return 0;
                    }),
                    backgroundColor: colorMapping["Tension"] || 'rgba(0, 0, 0, 0.1)'
                }
            ] : showValue.map(value => ({
                label: value,
                data: labels.map((_, index) => {
                    if (data_database.length > 0) {
                        if (data_database[index]) return data_database[index][value.toLowerCase()];
                        return 0;
                    }
                    return 0;
                }),
                backgroundColor: colorMapping[value] || 'rgba(0, 0, 0, 0.1)', // You can also dynamically change this per dataset
                // ... other dataset properties
            })),
    };


    return (
        <Bar options={options} data={data} />
    )
}
