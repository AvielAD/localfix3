'use client'
import { fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
import TableRepair from '@/components/tablas/table'
import { BarBanner } from "@avielad/componentspublish"
import { useEffect, useState } from "react"
import FormFilters from '@/components/formularios/device_public'
import { DevicePublicDto } from '@/DTOS/equipos/devices'
import CardPricing from '@/components/cards/cardpricing'

const Reparaciones = () => {
    const [history, setHistory] = useState([] as Array<DevicePublicDto>)
    const [filters, setFilters] = useState({ name: "" })

    useEffect(() => {

        if (filters.name !== "") {
            fetcher(`/api/equipos/public/${filters.name}`).then((data) => {
                setHistory(data)
            })
        }

    }, [filters])
    console.log(filters)
    return (
        <div className="max-w-screen-lg mx-auto">
            <BarBanner title="Precios" starmessage="Cambio Display" arrowmessage=""></BarBanner>
            <FormFilters setValues={setFilters}></FormFilters>
            <div>
                {
                    history.map((item: DevicePublicDto, index: number) => (<CardPricing key={index} item={item}></CardPricing>))

                }
            </div>

        </div>
    )
}

export default Reparaciones