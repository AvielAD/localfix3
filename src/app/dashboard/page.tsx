'use client'
import { fetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { BarBanner, CardBaner, SkeletonTable } from "@avielad/componentspublish"
import useSWR from "swr"

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { DiagnosticStats } from "@/application/stats/dto/diagnosticstats.dto";

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Ventas Mensuales' },
  },
  scales: {
    y: {
      min: 0,      // Valor mínimo del eje Y
      max: 150,    // Valor máximo del eje Y
      ticks: {
        stepSize: 1, // Espaciado entre marcas
      },
    },
  },

};



const Dashboard = () => {
    const infoStatsGeneral = useSWR('/api/stats', fetcher)
    const infoStatsDiagnostic = useSWR('/api/stats/diagnostics', fetcher)
    const infoStatsDiagnosticMonth = useSWR('/api/stats/diagnostics/month', fetcher)

    const CardsBannerInfo = [
        {
            title: "En proceso",
            value: infoStatsGeneral.data?.starts ?? "0",
            icon: "bi bi-bar-chart-fill"
        },
        {
            title: "Pausadas",
            value: infoStatsGeneral.data?.paused ?? "0",
            icon: "bi bi-alarm-fill"
        },
        {
            title: "Terminadas",
            value: infoStatsGeneral.data?.doneMounthCurrent ?? "0",
            icon: "bi bi-clipboard-data-fill"
        },
        {
            title: "Entregadas",
            value: infoStatsGeneral.data?.deliveredMounthCurrent ?? "0",
            icon: "bi bi-box2-heart-fill"
        },
        {
            title: "Reparaciones",
            value: infoStatsGeneral.data?.repairsMounthCurrent ?? "0",
            icon: "bi bi-bar-chart-steps"
        },
        {
            title: "Diagnosticos",
            value: infoStatsGeneral.data?.diagnosticsMounthCurrent ?? "0",
            icon: "bi bi-diagram-3-fill"
        }
    ]

    let data = {
        labels: infoStatsDiagnosticMonth.data?.map((item: DiagnosticStats, index: number) => item.name),
        datasets: [
            
            {
                label: (new Date()).getFullYear().toString(),
                data: infoStatsDiagnostic.data?.map((item: DiagnosticStats, index: number) => item.count),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: `Mes: ${((new Date()).getMonth() + 1).toString()}`,
                data: infoStatsDiagnosticMonth.data?.map((item: DiagnosticStats, index: number) => item.count),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
            },
        ],
    };
 
    if (!infoStatsDiagnostic.data && !infoStatsDiagnosticMonth.data) return <SkeletonTable></SkeletonTable>

    return (<>
        <div className=''>
            <BarBanner title={{ message: "Estadisticas", icon: "bi bi-file-bar-graph-fill" }}></BarBanner>
            <div className='grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                {
                    CardsBannerInfo.map((item, index) => (
                        <CardBaner key={index} {...item}></CardBaner>
                    ))
                }
            </div>
            <div className="flex justify-center items-center max-w">
                <div className="overflow-hidden w-full h-full">
                    { data ? <Bar data={data} options={options}/> : null }
                </div>
            </div>
            
        </div>
    </>)
}

export default Dashboard

/**
 * <div className="flex justify-center items-center ">
                <div className="w-full h-full">
                    { data ? <Bar data={data} options={options} width={20} height={20} /> : null }
                </div>
            </div>
 */