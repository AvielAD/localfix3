'use client'
import { fetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { BarBanner, CardBaner, SkeletonTable } from "@avielad/componentspublish"
import useSWR from "swr"
import { DiagnosticStats } from "@/application/stats/dto/diagnosticstats.dto";
import { DictMonths, DictMonthsList } from "@/Utilities/DateTimeHelpers/FormattingDate";
import { GetValueObjectByKey } from "@/Utilities/json.helper";
import { DateTime } from "luxon";


const Dashboard = () => {
    const infoStatsGeneral = useSWR('/api/stats', fetcher)
    const StatsMonth = useSWR('/api/stats/2025/09/false', fetcher)
    const StatsYear = useSWR('/api/stats/2025/00/false', fetcher)

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
    if(!StatsMonth.data && !StatsYear.data && !infoStatsGeneral.data) return <SkeletonTable></SkeletonTable>
    return (<>
        <div className=''>
            <BarBanner title={{ message: "Estadisticas Reparaciones", icon: "bi bi-file-bar-graph-fill" }}></BarBanner>
            <div className='grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                {
                    CardsBannerInfo.map((item, index) => (
                        <CardBaner key={index} {...item}></CardBaner>
                    ))
                }
            </div>
            <BarBanner title={{ message: `Estadisticas Consultas ${(DictMonthsList.find(x => x.Num == (DateTime.now().month )))?.Name}`, icon: "bi bi-file-bar-graph-fill" }}></BarBanner>
            <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {
                    StatsMonth.data?.map((item: DiagnosticStats, index:number)=>(
                        <CardBaner key={index} title={item.name} value={item.count.toString()} icon="bi bi-graph-up-arrow"></CardBaner>
                    ))
                }
            </div>
             <BarBanner title={{ message: `Estadisticas Consultas ${DateTime.now().year}`, icon: "bi bi-file-bar-graph-fill" }}></BarBanner>
            <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {
                    StatsYear.data?.map((item: DiagnosticStats, index:number)=>(
                        <CardBaner key={index} title={item.name} value={item.count.toString()} icon="bi bi-graph-up-arrow"></CardBaner>
                    ))
                }
            </div>
        </div>
    </>)
}

export default Dashboard

