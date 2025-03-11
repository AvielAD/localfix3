'use client'
import useSWR from "swr"
import { fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import TableRepair from '@/components/tablas/table'
import { BarBanner } from "@avielad/componentspublish"
import { useContext, useEffect } from "react"
import { RefreshContext } from "../layout"
const Reparaciones = () => {
    const infoRepairs = useSWR('/api/reparaciones', fetcher)
    const useRefreshContext = useContext(RefreshContext)

    useEffect(()=>{
        if(infoRepairs.data) infoRepairs.mutate()
    },[useRefreshContext?.refreshValue,infoRepairs])

    if (!infoRepairs.data) return <>loading...</>

    return (
        <div className="max-w-screen-lg mx-auto">
            <BarBanner title="Reparaciones" starmessage="Filtrado" arrowmessage="Iniciadas Terminadas"></BarBanner>
            <TableRepair elements={infoRepairs.data} urldetails="/dashboard/reparaciones/details/"></TableRepair>
        </div>
    )
}

export default Reparaciones