'use client'
import { EconomicStats, GroupStats } from "@/application/stats/dto/diagnosticstats.dto"
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
    const [dateContable, setDateContable] = useState<DateState>({ year: NowDate.year, month: 0 })

    const { data: StatsContable, mutate: mutateContable } = useSWR<EconomicStats>(`/api/stats/contable/${dateContable.year}/${dateContable.month}`, fetcher)

    useEffect(() => {
        mutateContable()
    }, [dateContable])

    const OnSelecContable = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const Value = parseInt(e.target.value)
        if (Value <= 12)
            setDateContable({ ...dateContable, month: Value })
        else
            setDateContable({ ...dateContable, year: Value })

    }

    if (!StatsContable) return <SkeletonTable></SkeletonTable>
    const ProfitValue = StatsContable.totalRepairs > 0 ? ((((StatsContable.totalRepairs - StatsContable.totalRefaccionesCompra)/StatsContable.totalRepairs)) *100) : 0
    return (<>
        <div className=''>
            <BarBanner title={{ message: "Estadisticas Contables", icon: "bi bi-file-bar-graph-fill" }}></BarBanner>

            <div className="w-full grid grid-cols-1 gap-2">
                <div className="grid grid-cols-1 shadow-md rounded-2xl my-5">
                    <div className="grid grid-cols-2 gap-2 mx-auto">
                        <div>
                            <select value={dateContable.year} onChange={OnSelecContable} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                        <div>
                            <select value={dateContable.month} onChange={OnSelecContable} className="border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
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
                        <div className='grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                            <CardBaner value={StatsContable?.counterRepairs?.toString()} title="Reparaciones Counter" icon="bi bi-wallet"></CardBaner>
                            <CardBaner value={StatsContable?.totalRepairs?.toString()} title="Reparaciones Flujo" icon="bi bi-wallet"></CardBaner>
                            <CardBaner value={StatsContable?.totalConsult?.toString()} title="Consultas Presupuesto" icon="bi bi-wallet"></CardBaner>
                            <CardBaner value={StatsContable?.totalRefaccionesCompra?.toString()} title="Refacciones Compra" icon="bi bi-bag"></CardBaner>
                            <CardBaner value={StatsContable?.totalRefaccionesVenta?.toString()} title="Refacciones Venta" icon="bi bi-wallet"></CardBaner>
                            <CardBaner value={(ProfitValue)?.toString() + "%"} title="Profit" icon="bi bi-cash-stack"></CardBaner>
                        </div>
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

