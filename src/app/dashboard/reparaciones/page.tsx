'use client'
import useSWR from "swr"
import { fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import TableRepair from '@/components/tablas/table'
import { BarBanner, ElementList } from "@avielad/componentspublish"
import { useContext, useEffect } from "react"
import { RefreshContext } from "../layout"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import { useRouter } from "next/navigation"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"

const Reparaciones = () => {
    const infoRepairs = useSWR('/api/reparaciones', fetcher)
    const useRefreshContext = useContext(RefreshContext)
    const router = useRouter()

    useEffect(()=>{
        if(infoRepairs.data) infoRepairs.mutate()
    },[useRefreshContext?.refreshValue,infoRepairs])
    if (!infoRepairs.data) return <>loading...</>
    return (
        <div className="mx-auto">
            <BarBanner title={{ message: "Reparaciones", icon: "bi bi-cart4" }} ></BarBanner>
            <div className='grid gap-3'>
                    {
                        infoRepairs.data ? infoRepairs.data.map((item: ReparacionDto, index: number) =>
                        (<ElementList
                            title={`${item.brand} ${item.model}`}
                            state={{ info: item.state.nombre , message: item.state.nombre }}
                            bannermessage={``}
                            buttons={[{ action: () => { router.push(`/dashboard/reparaciones/details/${item.uuid}`) }, title: "Ver Detalles", disabled: false }]}
                            messages={[
                                { title: "Fecha Recepcion", message: ` ${FormatMedDate(item.dateReception)}` },
                                { title: "Fecha Entrega", message: ` ${FormatMedDate(item.dateDelivery)}` }
                            ]}
                            key={index} ></ElementList>)) : <></>
                    }
                </div>
        </div>
    )
}

export default Reparaciones