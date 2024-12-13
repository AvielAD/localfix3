'use client'
import { fetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { BarBanner, CardBaner } from "@avielad/componentspublish"
import useSWR from "swr"

const Dashboard = () => {
    const infoRepairs = useSWR('/api/stats', fetcher)
    

    const CardsBannerInfo = [
        {
            title: "En proceso",
            value:  infoRepairs.data?.starts ?? "0",
            icon: "bi bi-bar-chart-fill"
        },
        {
            title: "Pausadas",
            value: infoRepairs.data?.paused ?? "0",
            icon: "bi bi-alarm-fill"
        },
        {
            title: "Terminadas",
            value: infoRepairs.data?.doneMounthCurrent ?? "0",
            icon: "bi bi-clipboard-data-fill"
        },
        {
            title: "Entregadas",
            value: infoRepairs.data?.deliveredMounthCurrent ?? "0",
            icon: "bi bi-box2-heart-fill"
        },
        {
            title: "Reparaciones",
            value: infoRepairs.data?.repairsMounthCurrent ?? "0",
            icon: "bi bi-bar-chart-steps"
        },
        {
            title: "Diagnosticos",
            value: infoRepairs.data?.diagnosticsMounthCurrent ?? "0",
            icon: "bi bi-diagram-3-fill"
        }
    ]

    return (<>
        <div className=''>
        <BarBanner title='Estadisticas' starmessage='Métricas localfix' arrowmessage='consideraciones más importantes'></BarBanner>
            <div className='grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                {
                    CardsBannerInfo.map((item, index) => (
                        <CardBaner key={index} {...item}></CardBaner>
                    ))
                }
            </div>
        </div>
    </>)
}

export default Dashboard

