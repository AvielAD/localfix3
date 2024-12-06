'use client'
import useSWR from "swr"
import { fetcher, postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import TableRepair from '@/components/tablas/table'
import { BarBanner } from "@avielad/componentspublish"
import { useEffect, useState } from "react"
import { ReparacionDto, ReparacionInputByFilters } from "@/DTOS/reparaciones/reparacion"
import FormFilters from '@/components/formularios/filters'
const Reparaciones = () => {
    const [history, setHistory] = useState([] as Array<ReparacionDto>)
    const [filters, setFilters] = useState({ idState: 0, name: "", dateStart: null, dateEnd: null } as ReparacionInputByFilters)


    useEffect(() => {

        if(filters){
            console.log(filters)
            postFetcher('/api/reparaciones/filters', filters).then((data) => {
                setHistory(data)
            })
        }

    }, [filters])
    return (
        <div className="max-w-screen-lg mx-auto">
            <BarBanner title="Reparaciones" starmessage="Filtrado" arrowmessage="Iniciadas Terminadas"></BarBanner>
            <FormFilters setValues={setFilters}></FormFilters>
            <TableRepair elements={history} urldetails="/dashboard/reparaciones/details/"></TableRepair>
        </div>
    )
}

export default Reparaciones