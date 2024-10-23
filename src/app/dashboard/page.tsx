'use client'
import { BarBanner, CardBaner } from "@avielad/componentspublish"

const Dashboard = () => {
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

const CardsBannerInfo = [
    {
        title: "En proceso",
        value: "200",
        icon: "bi bi-bar-chart-fill"
    },
    {
        title: "Por entregar",
        value: "200",
        icon: "bi bi-pie-chart-fill"
    },
    {
        title: "Mes actual",
        value: "200",
        icon: "bi bi-bar-chart-steps"
    },
    {
        title: "Diagnosticos",
        value: "200",
        icon: "bi bi-graph-up-arrow"
    }
]