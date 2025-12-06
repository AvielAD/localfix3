'use client'
import { GroupStats } from "@/application/stats/dto/diagnosticstats.dto"
import VerticalBarChartRepairs from "@/components/charts/bar.chart"
import VerticalBarChartDiagnostics from "@/components/charts/bar.chart"
import { fetcher } from "@/Utilities/FetchHelper/Fetch.helper"
import { BarBanner, CardBaner, SkeletonTable } from "@avielad/componentspublish"
import { DateTime } from "luxon"
import { useEffect, useEffectEvent, useState } from "react"
import useSWR from "swr"

interface DateState {
    year: number,
    month: number
}
interface StructBarGraph {
    title: string,
    labels: Array<string>,
    data: Array<number>
}
interface LabelData {
    repair: StructBarGraph,
    diagnostic: StructBarGraph
}

const Dashboard = () => {
    const NowDate = DateTime.now().plus({ months: -1 })
    const [dateRepair, setDateRepair] = useState<DateState>({ year: NowDate.year, month: 0 })
    const [dateDiagnostic, setDateDiagnostic] = useState<DateState>({ year: NowDate.year, month: 0 })

    const infoStatsGeneral = useSWR('/api/stats', fetcher)
    const { data: StatsRepair, mutate: mutateRepair } = useSWR<Array<GroupStats>>(`/api/stats/repair/${dateRepair.year}/${dateRepair.month}`, fetcher)
    const { data: StatsDiagnostic, mutate: mutateDiagnostic } = useSWR(`/api/stats/diagnostic/${dateDiagnostic.year}/${dateDiagnostic.month}`, fetcher)

    useEffect(() => {
        mutateRepair()
        mutateDiagnostic()
    }, [dateRepair, dateDiagnostic])

    const OnSelectRepair = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const Value = parseInt(e.target.value)
        if (Value <= 12)
            setDateRepair({ ...dateDiagnostic, month: Value })
        else
            setDateRepair({ ...dateDiagnostic, year: Value })

    }

    const OnSelectDiagnostic = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const Value = parseInt(e.target.value)
        if (Value <= 12)
            setDateDiagnostic({ ...dateRepair, month: Value })
        else
            setDateDiagnostic({ ...dateRepair, year: Value })

    }

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

    if (!infoStatsGeneral.data) return <SkeletonTable></SkeletonTable>

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
            <div className="w-full grid grid-cols-1 gap-2">
                <div className="grid grid-cols-1 shadow-md rounded-2xl my-5">
                    <div className="grid grid-cols-2 gap-2 mx-auto">
                        <div>
                            <select onChange={OnSelectRepair} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={OnSelectRepair} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="0">Mes</option>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[250px] w-[300px] md:h-[500px] md:w-[600px] xl:h-[750px] xl:w-[900px] 2xl:h-[1000px] 2xl:w-[1100px] mx-auto">
                        {
                            StatsRepair ?
                                <VerticalBarChartRepairs
                                    title="Reparaciones"
                                    data={StatsRepair.map((item) => item.counter)}
                                    labels={StatsRepair.map((item) => item.name)}
                                ></VerticalBarChartRepairs> : null
                        }
                    </div>
                </div>


                <div className="grid grid-cols-1 shadow-md rounded-2xl my-5">
                    <div className="grid grid-cols-2 gap-2 mx-auto">
                        <div className="">
                            <select onChange={OnSelectDiagnostic} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                            </select> 
                        </div>
                        <div>
                            <select onChange={OnSelectDiagnostic} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="0">Mes</option>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>

                        </div>
                    </div>
                    <div className="h-[250px] w-[300px] md:h-[500px] md:w-[600px] xl:h-[750px] xl:w-[900px] 2xl:h-[1000px] 2xl:w-[1100px] mx-auto">
                        {
                            StatsDiagnostic ?
                                <VerticalBarChartDiagnostics
                                    title="Diagnosticos"
                                    data={StatsDiagnostic.map((item: GroupStats) => item.counter)}
                                    labels={StatsDiagnostic.map((item: GroupStats) => item.name)}
                                ></VerticalBarChartDiagnostics> : null
                        }
                    </div>
                </div>


            </div>
        </div>
    </>)
}

export default Dashboard

/**
 * Estadisticas por año y mes 
 * diagnosticos
 * reparaciones
 * contabilidad
 */

