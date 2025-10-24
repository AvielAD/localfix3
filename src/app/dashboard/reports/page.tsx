'use client'
import {  postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import TableRepair from '@/components/tablas/table'
import { BarBanner } from "@avielad/componentspublish"
import { useEffect, useState } from "react"
import { ReparacionDto, ReparacionInputByFilters } from "@/DTOS/reparaciones/reparacion"
import FormFilters from '@/components/formularios/filters'
const Reparaciones = () => {
    const [history, setHistory] = useState([] as Array<ReparacionDto>)
    const [filters, setFilters] = useState({ idState: 2, name: "", dateStart: null, dateEnd: null } as ReparacionInputByFilters)

    useEffect(() => {

        if(filters){
            console.log(filters)
            postFetcher('/api/reparaciones/filters', filters).then((data) => {
                setHistory(data)
            })
        }

    }, [filters])
    return (
        <div className="max-w-(--breakpoint-lg) mx-auto">
            <BarBanner title={{ message: "Reportes", icon: "bi bi-calculator-fill" }}></BarBanner>
            <FormFilters setValues={setFilters}></FormFilters>
            <TableRepair elements={history} urldetails="/dashboard/reparaciones/details/"></TableRepair>
        </div>
    )
}

export default Reparaciones