'use client'
import useSWR from "swr"
import { fetcher, postFetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import { BarBanner, ElementList, FormSearhFilters, SkeletonTable } from "@avielad/componentspublish"
import { useContext, useEffect, useState } from "react"
import { RefreshContext } from "../layout"
import { ReparacionDto } from "@/DTOS/reparaciones/reparacion"
import { useRouter } from "next/navigation"
import { FormatMedDate } from "@/Utilities/DateTimeHelpers/FormattingDate"
import { RepairByFilters, RepairInput, RepairResumeDto } from "@/application/repairs/dto/repair.dto"
import FormFilters from '@/application/repairs/form/filters.form'

const Reparaciones = () => {
    const [showFilters, setShowFilters] = useState(false)
    const [dataValuesFilter, setDataValuesFilter] = useState<RepairByFilters>({
        idState:2
    } as RepairByFilters)
    const [dataRepair, setDataRepair] = useState<Array<RepairResumeDto>>()
    const useRefreshContext = useContext(RefreshContext)
    const router = useRouter()

    useEffect(() => {
        postFetcher('/api/reparaciones/filters', dataValuesFilter)
            .then((data) => {
                setDataRepair(data)
            })
    }, [dataValuesFilter])
    
    
    if (!dataRepair) return <SkeletonTable></SkeletonTable>

     const OnSubmitFilters = (values: RepairByFilters) => {
        setDataValuesFilter(values)
    }
    const SetClientName = (name: string) => {
        setDataValuesFilter({ ...dataValuesFilter, name })
    }
    return (
        <div className="mx-auto">
            <BarBanner title={{ message: "Reparaciones", icon: "bi bi-cart4" }} >
                <FormSearhFilters
                        showFilters={{ show: showFilters, setShow: () => setShowFilters(!showFilters) }}
                        datainput={{ setValue: SetClientName }}>
                        <FormFilters OnSubmit={OnSubmitFilters}></FormFilters>
                    </FormSearhFilters>
            </BarBanner>
            <div className='grid gap-3'>
                    {
                        dataRepair ? dataRepair.map((item: ReparacionDto, index: number) =>
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