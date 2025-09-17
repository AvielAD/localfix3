'use client'
import { fetcher } from '@/Utilities/FetchHelper/Fetch.helper'
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
        <div className="max-w-(--breakpoint-lg) mx-auto">
            <BarBanner title={{ message: "Panel Presupuestos", icon: "bi bi-calculator-fill" }}></BarBanner>
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