import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Registrar los módulos necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalBarChart = (params:{title: string, labels: Array<string>, data: Array<number>}) => {
  const data = {
    labels: params.labels,
    datasets: [
      {
        label: params.title,
        data: params.data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estadisticas",
      },
    },
    scales: {
      y: {
        ticks:{
          stepSize: 50
        },
        min:0,
        max:150
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default VerticalBarChart;